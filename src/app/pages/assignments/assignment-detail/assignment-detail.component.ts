import { Component, OnInit , Input} from '@angular/core';
import { Assignment } from '../../../shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  @Input() assignmentTransmis : Assignment | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
