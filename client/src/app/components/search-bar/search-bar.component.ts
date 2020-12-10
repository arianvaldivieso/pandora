import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { HttpRequestConfig } from 'ngx-autocomplete-api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../../services/category/category.service';
import { IndustryService } from './../../services/industry/industry.service';
import { SubCategoryService } from './../../services/subCategory/sub-category.service';
import { TypeService } from './../../services/type/type.service';
import { CollaboratorService } from './../../services/collaborator/collaborator.service';

import { environment } from './../../../environments/environment';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  apiUrl = environment.apiUrl+'/availability/autocomplete';
  names = [];
  chips = [];
  normalChips = [];
  title = undefined;

  term = '';

  categories:any = [];
  selectedCategories:any = [];

  subCategories:any;
  selectedSubCategory:any;

  industries:any;
  selectedIndustry:any;

  types:any;
  selectedType:any;

  collaborators:any = [];
  selectedCollaborator:any;


  selectedTag:any;

  tags = [];

  @Output() filters = new EventEmitter<any>();
  @Output() itemOutput = new EventEmitter<any>();

  @Input() collaborator:any;
  @Input() collection:any;
  @Input() items = [];

  searchForm: FormGroup;

  constructor(
    private _category: CategoryService,
    private _industry: IndustryService,
    private _subCategory: SubCategoryService,
    private _type: TypeService,
    private _collaborator: CollaboratorService,

    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //this.getCategories();
    //this.getInsdustries();
    //this.getSubCategories();
    //this.getTypes();
    //this.getCollaborators();
    //this.createForm();
  }

  onKey($event){

    this.itemOutput.emit(this.term);
  }


  value = 'Referencia';
  config: HttpRequestConfig = {
    method: 'GET',
    dataApi: this.apiUrl,
    fieldToDisplay: 'reference',
    textInUrlToReplace: '<thisIsText>'
  };
  

  mapFunction = (data) => {
    return data.data.items
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      keyword: '',
    });

    
  }

  get keyword() {
    return this.searchForm.get('keyword');
  }

  getCategories(){
    this._category.getCategories().subscribe((response:any) => {
      this.categories = response.data;
    })
  }

  getInsdustries(){
    this._industry.getInsdustries().subscribe((response:any) => {
      this.industries = response.data;
    })
  }

  getSubCategories(){
    this._subCategory.getSubCategories().subscribe((response:any) => {
      this.subCategories = response.data;
    })
  }

  getTypes(){
    this._type.getTypes().subscribe((response:any) => {
      this.types = response.data;
    })
  }

  async getCollaborators(){
    
  }

  getStorageTemp(key:string){

    let data = [];
    switch (key) {
      case "categories":
        data = this.categories;
        break;
      case "industries":
        data = this.industries;
        break;
      case "sub_categories":
        data = this.subCategories;
        break;
      case "type":
        data = this.types;
        break;
      case "collaborators":
        data = this.collaborators;
        break;
      default:
        data = []
        break;
    }

    return data;

  }

  getValueOfFilter(key){
    let data;
    switch (key) {
      case "categories":
        data = [];
        break;
      case "industries":
        data = this.selectedIndustry;
        break;
      case "sub_categories":
        data = this.selectedSubCategory;
        break;
      case "type":
        data = this.selectedType;
        break;
      case "collaborators":
        data = this.selectedCollaborator;
        break;
      default:
        data = []
        break;
    }

    return data;
  }

  getFilters(){
    return {
      categories:(this.selectedCategories) ? this.selectedCategories : undefined,
      industry_id:(this.selectedIndustry) ? this.selectedIndustry : undefined,
      sub_category_id:(this.selectedSubCategory) ? this.selectedSubCategory : undefined,
      type:(this.selectedType) ? this.selectedType : undefined,
      collaborator:(this.selectedCollaborator) ? this.selectedCollaborator : undefined,
      tags: (this.tags.length) ? this.tags : undefined
    }
  }


  onChangeFilter(key:any = false){

    if (key) {

      let filters = this.getFilters();

      let storage = this.getStorageTemp(key);
      let id = this.getValueOfFilter(key);


      if (id != null) {
        let names = storage.filter((item) => {
          return (item.id == id)
        });

        let name = (names.length) ? names[0].name : false; 


        if (name) {
          let chip = {
            id: id,
            name: name,
            table: key
          }
          this.addChip(chip,true);
        }
      }else{
        this.deleteChips(false,true,key)
      }

    }
  }


  onSelected($event){

    let data = $event.data;

    console.log(data);

    if (data.table == 'categories') {
      //this.selectedCategory = data.id;
    }else if(data.table == 'industries'){
       this.selectedIndustry = data.id;
    }else if(data.table == 'types'){
       this.selectedType = data.id;
    }else if(data.table == 'sub_categories'){
       this.selectedSubCategory = data.id;
    }else if(data.table == 'tags'){
      this.tags.push(data.id)
    }

    let chip = $event.data;
    chip.name = chip.name.split(' - ')[0];

     this.searchForm.reset();
    this.addChip(chip,true)



  }

  addChip(chip,output = false){
    this.chips.push(chip)

    let data = this.chips.filter((obj, pos, arr) => {
      return arr.map(mapObj =>
        mapObj.table).indexOf(obj.table) == pos;
      });
    
    this.chips = data;

    if (output) {

      let filters = this.getFilters();

      this.filters.emit(filters);
    }

    

  }

  deleteChips(chip,output = false,key){

    if (chip.table == 'categories' || key == 'categories') {
      //this.selectedCategory = undefined;
    }else if(chip.table == 'industries' || key == 'industries'){
      this.selectedIndustry = undefined;
    }else if(chip.table == 'sub_categories' || key == 'sub_categories'){
      this.subCategories = undefined;
    }else if(chip.table == 'collaborators' || key == 'collaborators'){
      this.collaborators = undefined;
    }else if(chip.table == 'types' || key == 'types'){
      this.selectedType = undefined;
    }

    let i;

    if (chip) {
      i = this.chips.findIndex((item) => {
        return (chip.id == item.id && chip.table == item.table)
      });
    }else{
      i = this.chips.findIndex((item) => {
        return (key == item.table)
      });
    }

   
    if ( i !== -1 ) {
      this.chips.splice( i, 1 );
      
    }

    if (output) {
      let filters = this.getFilters();
      this.filters.emit(filters)
    }
  }

  toggleCategory(category){

    let i = this.selectedCategories.indexOf(category.id);

    if (i === -1) {
      this.selectedCategories.push(category.id);
    }else{
      this.selectedCategories.splice( i, 1 );
    }

    this.filters.emit(this.getFilters());
    this.searchForm.reset();

    console.log(this.selectedCategories)

  }




}
