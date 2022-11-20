import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../shared/model/comment.model";
import {ReplyModal} from "../shared/model/reply.model";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/state/app-state";
import {isCurrentUsername} from "../shared/state/user/user-selector";
import {Observable} from "rxjs";
import {CommentService} from "../shared/service/comment.service";
import {DeleteDialog} from "../shared/dialog/delete-dialog/delete-dialog";
import {MatDialog} from "@angular/material/dialog";

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
  showReplyComment = false;
  showReplyReply = false;
  ReplyModal?: ReplyModal;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
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


  edit() {
    if(this.editToggle) {
      this.editToggle = false;
      this.editMessage = '';
    } else {
      this.editToggle = true;
      this.editMessage = this.message?.content || '';
    }
  }

  delete(messageId: number) {
    const dialogRef = this.dialog.open(DeleteDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.commentService.deleteMessage(messageId);
      }
    });
  }

  updateMessage(messageId: number) {
    this.commentService.updateMessage(messageId, this.editMessage);
  }

  reply(message: CommentModel | ReplyModal, parentComment: CommentModel) {
    if(this.showReplyComment || this.showReplyReply) {
      this.showReplyComment = false;
      this.showReplyReply = false;
    } else {
      if(message.id == parentComment.id) {
        this.showReplyReply = false;
        this.showReplyComment = true;
      } else {
        this.showReplyComment = false;
        this.showReplyReply = true;
      }
    }
  }
}
