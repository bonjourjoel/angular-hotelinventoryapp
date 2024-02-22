import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ResolveFn } from '@angular/router';

import { commentGuardResolveComments } from './comment.guard';
import { Comments } from '../models/comments';

describe('commentGuardResolveComments', () => {
  const executeGuard: ResolveFn<Comments[]> = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      commentGuardResolveComments(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
