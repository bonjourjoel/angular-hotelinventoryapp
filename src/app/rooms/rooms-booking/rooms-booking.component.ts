import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  imports: [RouterModule, AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss',
})
export class RoomsBookingComponent {
  // id!: number;
  id$: Observable<number> = this.route.params.pipe(
    map((params) => Number(params['id']))
  );

  bookingForm!: FormGroup;

  constructor(private route: ActivatedRoute) {
    // route.paramMap.subscribe((params) => {
    //   this.id = Number(params.get('id'));
    // });
    // this.id = Number(route.snapshot.paramMap.get('id')); // doesn't update if change id while staying on same component
  }
}
