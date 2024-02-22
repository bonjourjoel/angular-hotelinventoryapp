import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RouteConfigToken } from '../services/routeConfig.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent,
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: { title: 'Room' },
    },
  ],
  exports: [RoomsListComponent, RoomsBookingComponent, RoomsAddComponent],
})
export class RoomsModule {}
