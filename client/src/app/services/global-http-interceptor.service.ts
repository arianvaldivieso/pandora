import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    
  constructor(
    private _notify: ToastrService
  ) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept')


        if (error.status == 500 || error.status == 0) {
          this._notify.error('We had a problem, try again later');
        }else if(error.status == 401){
          this._notify.error('Your session expired');
        }

        //console.error(error);
        return throwError(error);
      })
    )
  }
}
 
