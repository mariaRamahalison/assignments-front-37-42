import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { options } from '../utils/utils';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri_api = 'http://localhost:8010/api';
  header = options;
  constructor(private http: HttpClient) { }

  saveMatiere(matiere: Matiere){
    return this.http.post(`${this.uri_api}/matiere`, matiere, this.header);
  }


}
