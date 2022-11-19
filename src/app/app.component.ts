import { Component } from '@angular/core';
import {CommentService} from "./shared/service/comment.service";
import {Store} from "@ngrx/store";
import {AppState} from "./shared/state/app-state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public store: Store<AppState>,
    private commentService: CommentService
  ) {
    this.commentService.initializeComments();
  }
}
