import { Component,
         OnInit,
         forwardRef,
         Input,
         AfterViewInit,
         ViewChild,
         ElementRef,
         Output,
         EventEmitter,
         OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { NgxAutocompleteService } from './ngx-autocomplete.service';
import { distinctUntilChanged, takeUntil, switchMap, debounceTime, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-autocomplete',
  templateUrl: './ngx-autocomplete.component.html',
  styleUrls: ['./ngx-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxAutocompleteComponent),
    multi: true
  }]
})
export class NgxAutocompleteComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() type: string = 'text';
  @Input() placeholder: string;
  @Input() apiString: string;
  @Input() paramName: string;
  @Input() payloadPropName: string;
  @Input() suggestionPropName: string;
  @Input() staticDataSource: any[];
  @Input() control: FormControl = new FormControl();
  @ViewChild('input') inputRef: ElementRef;
  @Output() selected = new EventEmitter<string>();
  private innerValue: string = '';
  private doQuery: boolean = true;
  public suggestions: any;
  public activeSuggestionIndex: number = 0;
  private ngUnsubscribe = new Subject();

  constructor(
    private ngxAutocompleteService: NgxAutocompleteService,
    private elRef: ElementRef
  ) { }

  get value(): string {
    return this.innerValue;
  };

  set value(value: string) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  writeValue(value: string) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  propagateChange = (_: any) => { }

  onChange(e: KeyboardEvent, value: string){
    if (e.keyCode !== 13) {
      this.doQuery = true;
      this.innerValue = value;
      this.propagateChange(this.innerValue);
    }
  }

  fillTextBox(value: any) {

    let data = value;
    value = value.full;

    this.doQuery = false;
    this.inputRef.nativeElement.value = value;
    this.innerValue = value;
    this.propagateChange(data);
    this.selected.emit(data);
    this.activeSuggestionIndex = undefined;
  }

  getClass(value: string, style: string): string {
    let inputValue = (this.control.value != null && this.control.value.full) ? this.control.value.full : this.control.value; 

    inputValue = (inputValue) ? inputValue : '';

    if (value.toLowerCase() == inputValue.toLowerCase()) {
      return `highlighted ${style}`;
    } else {
      return style;
    }
  }

  subscribeForSuggestionsFromApi() {
    this.control.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((fieldValue: string) => this.ngxAutocompleteService.getSuggestonsfromApi(this.doQuery, fieldValue, this.apiString, this.paramName, this.payloadPropName || null, this.suggestionPropName || null)),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(suggestions => {
      this.suggestions = suggestions;
      this.activeSuggestionIndex = 0;
    });
  }

  subscribeForSuggestionsFromStaticDataSource() {
    this.control.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((fieldValue: string) => this.ngxAutocompleteService.getSuggestonsfromStaticDataSource(this.doQuery, fieldValue, this.staticDataSource, this.suggestionPropName || null)),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(suggestions => {
      this.suggestions = suggestions;
      this.activeSuggestionIndex = 0;
    });
  }

  subscribeForKeyboardEvents() {
    fromEvent(this.elRef.nativeElement, 'keydown')
    .pipe(
      filter((e: any) => e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13),
      map((e: any) => e.keyCode),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(keyCode => {
      if (keyCode === 40 && this.activeSuggestionIndex < this.suggestions.length-1) {
        this.activeSuggestionIndex ++;
      } else if (keyCode === 38 && this.activeSuggestionIndex > 0) {
        this.activeSuggestionIndex --;
      } else if (keyCode === 13) {
        this.fillTextBox(this.suggestions[this.activeSuggestionIndex]);
      }
    });
  }

  subscribeForNoValue() {
    this.control.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((changes) => {
      if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
          this.innerValue = '';      
          this.inputRef.nativeElement.value = '';
      } 
    });
  }

  ngAfterViewInit(){ }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.subscribeForNoValue();
    if (this.apiString && this.paramName && !this.staticDataSource) {
      this.subscribeForSuggestionsFromApi();
    } else if (!this.apiString && !this.paramName && this.staticDataSource) {
      this.subscribeForSuggestionsFromStaticDataSource()
    } else {
      console.error('Either static data source or API URL needs to be provided!');
    }
    this.subscribeForKeyboardEvents();
  }

}
