import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');

    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: Validators.required }
        ),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''], // shortcut for new FormControl('')
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: new FormControl('', { updateOn: 'blur' }),
        guestName: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              CustomValidator.validateName,
              CustomValidator.validateSpecialChar('*'),
            ],
          },
        ],
        guestAddress: [''],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([]),
        tnc: new FormControl(false, { validators: Validators.requiredTrue }),
        extraFieldUnused: [''],
      },
      {
        updateOn: 'change', // global form options
        validators: [CustomValidator.validateDate],
      }
    );
    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {
    //     console.log(data);
    //   });
    // });
    this.bookingForm.valueChanges
      .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue()); // raw = + disabled fields
    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    // setValue must set all the controls -- patchValue allows partial set
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-Feb-2020'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(
      this.fb.group({
        guestName: ['', { validators: Validators.required }],
        age: new FormControl(''),
      })
    );
  }

  deleteGuest(i: number) {
    this.guests.removeAt(i);
  }

  addFieldPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deleteFieldPassport() {
    this.bookingForm.removeControl('passport');
  }
}
