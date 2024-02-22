import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService], // use a separate local instance
})
export class EmployeeComponent {
  constructor(@Self() private roomsService: RoomsService) {}
  empName: string = 'John';
}
