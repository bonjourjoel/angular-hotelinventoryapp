import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  // providers: [RoomsService],
})
export class ContainerComponent implements AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor(private roomService: RoomsService) {}

  ngAfterContentInit(): void {
    this.employee.empName = 'Robert';
  }
}
