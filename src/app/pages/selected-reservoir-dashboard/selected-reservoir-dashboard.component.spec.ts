import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedReservoirDashboardComponent } from './selected-reservoir-dashboard.component';

describe('SelectedReservoirDashboardComponent', () => {
  let component: SelectedReservoirDashboardComponent;
  let fixture: ComponentFixture<SelectedReservoirDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedReservoirDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedReservoirDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
