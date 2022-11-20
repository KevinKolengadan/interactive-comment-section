import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../shared/state/app-state";
import {map, Observable} from "rxjs";
import {CommentModel} from "../shared/model/comment.model";
import {selectComments} from "../shared/state/comments/comment-selector";
import {ReplyModal} from "../shared/model/reply.model";

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
    this.comments$ = this.store.select(selectComments);
  }

  ngOnInit(): void {
  }


  /**
   * Function to sort the replies of a comment by ascending order of created date
   * @param replies
   */
  sortReplies(replies: ReplyModal[]) {
    let sortedReplies = [...replies];
    sortedReplies.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return sortedReplies;

  }
}
