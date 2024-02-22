import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { commentGuardResolveComments } from './guards/comment.guard';

const routes: Routes = [
  {
    path: 'comment',
    component: CommentComponent,
    resolve: { comments: commentGuardResolveComments },
  },
  // { path: 'comment/:id', component: null as any },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
