import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';
import { roomGuardCanActivateChild } from './guards/room.guard';

const routes: Routes = [
  {
    path: '', // empty instead of 'rooms' because the route is defined in root router's lazy loading
    component: RoomsComponent,
    children: [
      { path: 'add', component: RoomsAddComponent },
      // { path: ':id', component: RoomsBookingComponent },
    ],
    canActivateChild: [roomGuardCanActivateChild],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
