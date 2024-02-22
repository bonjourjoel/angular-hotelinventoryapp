import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { Comments } from '../models/comments';

@Component({
  selector: 'hinv-comment',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  comments$ = this.route.data.pipe(pluck('comments'));

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.data.subscribe((data) => {
    //   const comments : Comments[] = data['comments']
    //   console.log(comments);
    // });
  }
}
