import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = 'http://localhost:8010/api/matiere';

  getMatieres():Observable<any> {
    return this.http.get<Matiere[]>(this.uri_api);
  }

}
