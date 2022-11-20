import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../shared/state/app-state";
import {selectUser} from "../shared/state/user/user-selector";
import {CommentModel} from "../shared/model/comment.model";
import {ReplyModal} from "../shared/model/reply.model";
import {CommentService} from "../shared/service/comment.service";

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  @Input() parentComment: CommentModel | undefined;
  @Input() parentReply: ReplyModal | undefined;

  $currentUser$ = this.store.pipe(select(selectUser));
  message: string = '';
  constructor(
    private store: Store<AppState>,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function to add a new comment, reply or reply to a reply
   */
  addComment() {
    if(!this.parentComment) {
      this.commentService.addComment(this.message);
    } else if(!this.parentReply) {
      this.commentService.addCommentReply(this.parentComment, this.message);
    } else {
      this.commentService.addReply(this.parentComment, this.parentReply, this.message);
    }
  }
}
