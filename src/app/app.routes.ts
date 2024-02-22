import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { loginGuardCanActivate, loginGuardCanLoad } from './guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [loginGuardCanActivate],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [loginGuardCanActivate],
    canLoad: [loginGuardCanLoad],
  },
  {
    path: 'booking/:roomId',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
    canActivate: [loginGuardCanActivate],
  },
];
