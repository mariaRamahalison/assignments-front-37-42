import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementNotationComponent } from './assignement-notation.component';

describe('AssignementNotationComponent', () => {
  let component: AssignementNotationComponent;
  let fixture: ComponentFixture<AssignementNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignementNotationComponent]
    });
    fixture = TestBed.createComponent(AssignementNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
