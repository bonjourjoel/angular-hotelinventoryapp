import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { HeaderModule } from '../header/header.module';
import { Router, RouterModule } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  imports: [
    CommonModule,
    RoomsListComponent,
    HeaderModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'Hilton hotel';
  numberOfRooms = 10;
  hideRooms = false;
  selectedRoom?: RoomList;
  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  title = 'Rooms list';
  roomList!: RoomList[];

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  totalBytes = 0;

  subscription?: Subscription;

  error$ = new Subject<string>();
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );
  getError$ = this.error$.asObservable();

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  priceFilter = new FormControl(1000);

  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(`@ViewChild [ngOnInit]`, this.headerComponent);

    this.stream.subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => console.log('complete'),
      error: () => console.log('error'),
    });
    this.stream.subscribe((data) => {
      console.log(data);
    });

    this.subscription = this.rooms$.subscribe(
      (rooms) => (this.roomList = rooms)
    );

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('HTTP_PHOTOS:', 'request sent');
          break;
        case HttpEventType.ResponseHeader:
          console.log('HTTP_PHOTOS:', 'request success');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          console.log(
            'HTTP_PHOTOS:',
            'request download progress=',
            this.totalBytes
          );
          break;
        case HttpEventType.Response:
          console.log('HTTP_PHOTOS:', 'request completed', event.body);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(`@ViewChild [ngAfterViewInit]`, this.headerComponent);
    // console.log(
    //   `@ViewChild [ngAfterViewInit] title=`,
    //   this.headerComponent.title
    // );
    // this.headerComponent.title = 'Rooms header';
  }

  ngAfterViewChecked(): void {
    // this.headerComponent.title = 'Joel titre';
  }

  ngDoCheck(): void {
    console.log('event lifecycle do check is called');
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms list 2';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    // const room: RoomList = {
    //   roomNumber: '4',
    //   roomType: 'Deluxe room 4',
    //   amenities: 'Air conditioner, Free wi-fo, Bathroom, Kitchen',
    //   price: 500,
    //   photos:
    //     'https://www.hoteldelaplage.com/wp-content/uploads/2022/04/hoteldelaplage203c.jpeg',
    //   checkInTime: new Date('11-Nov-2021'),
    //   checkOutTime: new Date('12-Nov-2021'),
    //   rating: 4.5,
    // };
    // // this.roomList = [...this.roomList, room];
    // this.roomsService.addRoom(room).subscribe((data) => {
    //   this.roomList = data;
    // });
    this.router.navigate(['/rooms', 'add']);
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe room 3',
      amenities: 'Air conditioner, Free wi-fo, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://www.hoteldelaplage.com/wp-content/uploads/2022/04/hoteldelaplage203c.jpeg',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
