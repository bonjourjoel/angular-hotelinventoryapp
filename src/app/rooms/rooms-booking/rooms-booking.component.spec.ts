import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsBookingComponent } from './rooms-booking.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('RoomsBookingComponent', () => {
  let component: RoomsBookingComponent;
  let fixture: ComponentFixture<RoomsBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsBookingComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
