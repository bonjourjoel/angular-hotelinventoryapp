import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { roomGuardCanActivateChild } from './room.guard';

describe('roomGuardCanActivateChild', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      roomGuardCanActivateChild(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
