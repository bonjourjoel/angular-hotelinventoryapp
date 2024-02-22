import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CommentRoutingModule],
  exports: [CommentRoutingModule],
})
export class CommentModule {}
