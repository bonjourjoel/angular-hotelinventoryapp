import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'hinv-rooms-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, FilterPipe],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  @Input() rooms!: RoomList[];
  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Input() title: string = '';
  @Input() price!: number;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
  ngOnDestroy(): void {
    console.log('RoomsListComponent.OnDestroy is called');
  }
}
