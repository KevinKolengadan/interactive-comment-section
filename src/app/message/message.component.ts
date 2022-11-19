import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../shared/model/comment.model";
import {ReplyModal} from "../shared/model/reply.model";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/state/app-state";
import {isCurrentUsername} from "../shared/state/user/user-selector";
import {Observable} from "rxjs";
import {CommentService} from "../shared/service/comment.service";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: CommentModel | ReplyModal | undefined;
  @Input() parentComment: CommentModel | undefined;

  editMessage: string = '';
  editToggle = false;

  constructor(
    private store: Store<AppState>,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  isCurrentUser(username: string): Observable<boolean> {
    return this.store.select(isCurrentUsername(username));
  }

  upvoteMessage(messageId: number): void {
    this.commentService.upvoteMessage(messageId);
  }

  downvoteMessage(messageId: number): void {
    this.commentService.downvoteMessage(messageId);
  }

  reply() {

  }

  edit() {
    if(this.editToggle) {
      this.editToggle = false;
      this.editMessage = '';
    } else {
      this.editToggle = true;
      this.editMessage = this.message?.content || '';
    }
  }

  delete() {

  }

  updateMessage() {

  }
}
