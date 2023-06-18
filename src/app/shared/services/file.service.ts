import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { options } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uri_api = 'http://localhost:8010/api';
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


}
