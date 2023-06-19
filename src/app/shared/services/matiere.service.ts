import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { environment, options } from '../utils/utils';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri_api = environment.api_url;
  header = options;
  constructor(private http: HttpClient) { }

  saveMatiere(matiere: Matiere){
    return this.http.post(`${this.uri_api}/matiere`, matiere, this.header);
  }

  getMatieres():Observable<any> {
    return this.http.get<Matiere[]>(`${this.uri_api}/matiere`);
  }

}
