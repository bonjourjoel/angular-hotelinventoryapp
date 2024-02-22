import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { ConfigService } from '../services/config.service';
import { RoomsService } from './services/rooms.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsComponent, HttpClientModule],
      providers: [
        RoomsService,
        ConfigService,
        Router,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndPoint: 'http://localhost/api' },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'DUMMY_TITLE' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true);
  });
});
