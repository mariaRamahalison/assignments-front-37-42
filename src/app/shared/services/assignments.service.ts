import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { environment , options } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  header = options;
  constructor(private http:HttpClient) { }

    uri_api = environment.api_url+'/assignment';

  getAssignments(page:number, limit:number, professeur: string|null , auteur : string|null):Observable<any> {
    let params = "?page=" + page + "&limit=" + limit;
    if(professeur) params += "&professeur=" + professeur;
    if(auteur) params += "&auteur=" + auteur;
    return this.http.get<Assignment[]>(this.uri_api + params , options);
  }

  getAssignment(id:string):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.uri_api}/${id}` , options);
  }
 
  addAssignment(assignment:Assignment):Observable<any> {
    return this.http.post<Assignment>(this.uri_api, assignment ,options);
  }

  updateAssignment(assignment: Assignment) :Observable<any> {
    return this.http.put<Assignment>(this.uri_api, assignment , options)
  }

  deleteAssignment(id : string):Observable<any> {
    return this.http.delete(`${this.uri_api}/${id}` , options)
  }

}
