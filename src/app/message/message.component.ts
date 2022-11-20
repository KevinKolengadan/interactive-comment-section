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

  /**
   * Function to check if the current user is the author of the message
   * @param username
   */
  isCurrentUser(username: string): Observable<boolean> {
    return this.store.select(isCurrentUsername(username));
  }

  /**
   * Function to Upvote a comment or reply
   * @param messageId
   */
  upvoteMessage(messageId: number): void {
    this.commentService.upvoteMessage(messageId);
  }

  /**
   * Function to Downvote a comment or reply
   * @param messageId
   */
  downvoteMessage(messageId: number): void {
    this.commentService.downvoteMessage(messageId);
  }

  /**
   * Function to show edit window a comment or reply
   */
  edit() {
    if(this.editToggle) {
      this.editToggle = false;
      this.editMessage = '';
    } else {
      this.editToggle = true;
      this.editMessage = this.message?.content || '';
    }
  }

  /**
   * Function to delete a comment or reply
   * @param messageId
   */
  delete(messageId: number) {
    const dialogRef = this.dialog.open(DeleteDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.commentService.deleteMessage(messageId);
      }
    });
  }

  /**
   * Function to edit a comment or reply
   * @param messageId
   */
  updateMessage(messageId: number) {
    this.commentService.updateMessage(messageId, this.editMessage);
  }

  /**
   * Function to show a new reply window
   * @param message
   * @param parentComment
   */
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
