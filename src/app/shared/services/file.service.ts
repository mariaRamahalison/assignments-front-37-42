import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { environment, options } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uri_api = environment.api_url;
  header = options;
  constructor(private http: HttpClient) { }

  uploadFile(image: any){
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.uri_api}/photo`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFile(filename: string){
    return this.http.get(`${this.uri_api}/photo/${filename}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


}
