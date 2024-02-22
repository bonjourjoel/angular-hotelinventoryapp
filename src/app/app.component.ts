import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoggerService } from './rooms/services/logger.service';
import { localStorageToken } from './rooms/services/localstorage.token';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InitService } from './init.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ConfigService } from './services/config.service';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    RoomsComponent,
    ContainerComponent,
    EmployeeComponent,
    HttpClientModule,
    RouterModule,
    AppNavComponent,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  userGroup = 'Admin';

  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    http: HttpClient,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit()');
    if (this.name) {
      this.name.nativeElement.innerText = 'Hilton hotels';
    }

    // this.localStorage.setItem('name', 'Hilton hotal');

    // this.router.events.subscribe((event) => {
    //   console.log('ROUTER EVENT', event);
    // });
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationStart))
    //   .subscribe((event) => {
    //     console.log('Navigation Started', event);
    //   });
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     console.log('Navigation Ended', event);
    //   });
  }

  ngAfterViewInit(): void {
    // const componentRef = this.vcr.createComponent(RoomsComponent);
    // componentRef.instance.numberOfRooms = 50;
  }
}
