import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss',
})
export class RoomsAddComponent {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };
  successMessage: string = '';

  constructor(private roomService: RoomsService) {}

  addRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room added successfully';
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}
