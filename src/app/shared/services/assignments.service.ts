import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from '../data/data';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { environment } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
// tableau de devoirs à rendre
assignments:Assignment[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = environment.api_url+'assignment';

  getAssignments(page:number, limit:number, matiere: string|null , auteur : string|null):Observable<any> {
    let params = "?page=" + page + "&limit=" + limit;
    if(matiere) params += "&matiere=" + matiere
    if(auteur) params += "&auteur=" + auteur
    return this.http.get<Assignment[]>(this.uri_api + params);
  }

  getAssignment(id:string):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.uri_api}/${id}`);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  addAssignment(assignment:Assignment):Observable<any> {
    return this.http.post<Assignment>(this.uri_api, assignment);
  }

  updateAssignment(assignment: Assignment) :Observable<any> {
    return this.http.put<Assignment>(this.uri_api, assignment)
  }

  deleteAssignment(id : string):Observable<any> {
    return this.http.delete(`${this.uri_api}/${id}`)
  }

  // peuplerBD() {
  //   bdInitialAssignments.forEach(a => {
  //     const newAssignment = new Assignment();
  //     newAssignment.id = a.id;
  //     newAssignment.nom = a.nom;
  //     newAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     newAssignment.rendu = a.rendu;

  //     this.addAssignment(newAssignment)
  //     .subscribe((reponse) => {
  //       console.log(reponse.message);
  //     })
  //   })
  // }

  // cette version retourne un Observable. Elle permet de savoir quand
  // l'opération est terminée (l'ajout des 1000 assignments)
  // peuplerBDavecForkJoin():Observable<any> {
  //   // tableau d'observables (les valeurs de retour de addAssignment)
  //   let appelsVersAddAssignment:Observable<any>[] = [];
 
  //   bdInitialAssignments.forEach(a => {
  //     const nouvelAssignment = new Assignment();
  //     nouvelAssignment.id = a.id;
  //     nouvelAssignment.nom = a.nom;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;
 
  //     appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
  //   });
 
  //   return forkJoin(appelsVersAddAssignment);
  // }
 
}
