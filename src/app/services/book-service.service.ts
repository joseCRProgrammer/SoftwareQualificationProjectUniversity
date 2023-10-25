import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) {}


  list(value:string): Observable<any> {
    const params = new HttpParams()
    .append('q',value)
    return this.http.get('https://www.googleapis.com/books/v1/volumes', {params:params});
  }


}








