import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../model/matiere.model';
import { User } from '../model/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = 'http://localhost:8010/api/user';

  getUsers(type : string | null):Observable<any> {
    let params= "";
    if(type) params += "?type="+type;
    console.log(params);
    return this.http.get<User[]>(this.uri_api+params);
  }

}
