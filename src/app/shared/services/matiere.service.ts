import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { environment, options } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri_api = environment.api_url;
  header = options;
  constructor(private http: HttpClient) { }

  saveMatiere(matiere: any){
    return this.http.post(`${this.uri_api}/matiere`, matiere, this.header);
  }


}
