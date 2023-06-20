import { Component } from '@angular/core';
import { User } from '../../model/user.dto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user!: User ; 

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user')!);
  }

  isType(type){
    return this.user?.type === type;
  }


}
