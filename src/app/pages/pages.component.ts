import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { AssignmentsService } from '../shared/services/assignments.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  currentRoute:string = "";

  constructor(private authService:AuthService, 
              private router:Router,
              private assigmmentsService:AssignmentsService) {

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    
    
  }

  login() {
    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
      // on change le label du bouton
      this.labelConnexion = "Se déconnecter";
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }

  isLogged() {
    if(this.authService.loggedIn) {
      this.nom = "Michel Buffa";
    }
    return this.authService.loggedIn;
  }

  creerDonneesDeTest() {
    // this.assigmmentsService.peuplerBDavecForkJoin()
    // .subscribe(() => {
    //   console.log("Opération terminée, les 1000 données ont été insérées")

    //   // on refresh la page pour que la liste apparaisse
    //   // plusieurs manières de faire....
    //   window.location.reload();
    // });
  }
}