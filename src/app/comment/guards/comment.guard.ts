import { ResolveFn } from '@angular/router';
import { Comments } from '../models/comments';
import { inject } from '@angular/core';
import { CommentService } from '../services/comment.service';

export const commentGuardResolveComments: ResolveFn<Comments[]> = (
  route,
  state
) => {
  const commentService = inject(CommentService);
  return commentService.getComments();
};
