import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../utils/utils';
import { getPhotoUtil } from '../../utils/diplayImage';
import { EventBusService } from '../../services/event.bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userConnected: any;
  uri_api = environment.api_url;
  imageURL : string;
  private eventSubscription: Subscription;
  constructor(private authService: AuthService,private eventBusService: EventBusService){
    this.eventSubscription = this.eventBusService.getEvent().subscribe(async (eventData) => {
      this.userConnected = eventData;
      await this.getPhoto()
    });
  }

 async ngOnInit() {
    const user = localStorage.getItem('user');
    if(user) {
      this.userConnected = JSON.parse(user);
      await this.getPhoto();
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  getNom(){
    return `${this.userConnected.nom} ${this.userConnected.prenom}`;
  }

  getRole(){
    return this.userConnected.type;
  }

  async getPhoto(){
    this.imageURL = await getPhotoUtil(this.userConnected.photo);
  }

  logout(){
    this.authService.logout();
  }

  handleEvent(eventData: any): void {
    console.log('zany eh');
    
  }
}
