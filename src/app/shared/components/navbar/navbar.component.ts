import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../utils/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userConnected: any;
  uri_api = environment.api_url;
  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user) {
      this.userConnected = JSON.parse(user);
    }
  }

  getNom(){
    return `${this.userConnected.nom} ${this.userConnected.prenom}`;
  }

  getRole(){
    return this.userConnected.type;
  }

  getPhoto(){
    if(this.userConnected.photo !== ""){
      return `${this.uri_api}/photo/${this.userConnected.prenom}`
    }else{
      return '../assets/img/avatars/1.png';
    }
  }

  logout(){
    this.authService.logout();
  }
}
