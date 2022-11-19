import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/state/app-state";
import {Observable} from "rxjs";
import {CommentModel} from "../shared/model/comment.model";
import {selectComments} from "../shared/state/comments/comment-selector";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments$: Observable<CommentModel[]>;
  constructor(
    public store: Store<AppState>
  ) {
    this.comments$ = this.store.select(selectComments)
  }

  ngOnInit(): void {
  }

}
