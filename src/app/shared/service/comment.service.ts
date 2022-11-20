import { Injectable } from '@angular/core';
import {LocalStorageService} from "./localStorage.service";
import data from "../../../assets/data.json";
import {Store} from "@ngrx/store";
import {Comment, CommentModel} from "../model/comment.model";
import {Reply, ReplyModal} from "../model/reply.model";
import {selectComments} from "../state/comments/comment-selector";
import {take} from "rxjs";
import {AppState} from "../state/app-state";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) { }

  public initializeComments() {
    let comments = this.localStorageService.getData('comments');
    if(!comments) {
      comments = this.loadInitialComments();
    }
    this.store.dispatch({type: '[Comment] Set Comments', comments: comments});
    let currentUser = this.localStorageService.getData('currentUser');
    if(!currentUser) {
      currentUser = data.currentUser;
      this.localStorageService.saveData('currentUser', data.currentUser);
    }
    this.store.dispatch({type: '[User] Set User', user: currentUser});
  }

  private loadInitialComments() {
    let comments = [];
    let currentCommentId = 0;
    for(let comment of data.comments) {
      let replies = [];
      if(currentCommentId < comment.id) currentCommentId = comment.id;
      for(let reply of comment.replies) {
        if (currentCommentId < reply.id) currentCommentId = reply.id;
        replies.push(new Reply(reply.id, reply.content, new Date(), reply.score, reply.replyingTo, reply.user));
      }
      comments.push(new Comment(comment.id, comment.content, new Date(), comment.score, comment.user, replies));
    }
    this.localStorageService.saveData('comments', comments);
    this.localStorageService.saveData('currentCommentId', currentCommentId);
    return comments;
  }

  getNewCommentId() {
    let newCommentId =  this.localStorageService.getData('currentCommentId') + 1;
    this.localStorageService.saveData('currentCommentId', newCommentId);
    return newCommentId;
  }


  upvoteMessage(messageId: number) {
    this.store.dispatch({type: '[Comment] Upvote Comment', id: messageId});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });

  }
  downvoteMessage(messageId: number) {
    this.store.dispatch({type: '[Comment] Downvote Comment', id: messageId});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });
  }

  public static upvote(message: CommentModel | ReplyModal) {
    let score = 0;
    message.currentUserUpvoted? score-- : score++;
    message.currentUserDownvoted? score++ : score;
    if(message.currentUserUpvoted) {
      return {
        ...message,
        currentUserUpvoted: false,
        currentUserDownvoted: false,
        score: message.score + score
      }
    } else {
      return {
        ...message,
        currentUserUpvoted: true,
        currentUserDownvoted: false,
        score: message.score + score
      }
    }
  }

  public static downvote(message: CommentModel | ReplyModal) {
    let score = 0;
    message.currentUserDownvoted? score++ : score--;
    message.currentUserUpvoted? score-- : score;
    if(message.currentUserDownvoted) {
      return {
        ...message,
        currentUserUpvoted: false,
        currentUserDownvoted: false,
        score: message.score + score
      }
    } else {
      return {
        ...message,
        currentUserUpvoted: false,
        currentUserDownvoted: true,
        score: message.score + score
      }
    }
  }

  updateMessage(messageId: number, editMessage: string) {
    this.store.dispatch({type: '[Comment] Update Comment', id: messageId, updatedComment: editMessage});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });
  }

  deleteMessage(messageId: number) {
    this.store.dispatch({type: '[Comment] Remove Comment', id: messageId});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });
  }

  addComment(message: string) {
    let comment = new Comment(
      this.getNewCommentId(),
      message,
      new Date(),
      0,
      this.localStorageService.getData('currentUser'),
      []
    );
    this.store.dispatch({type: '[Comment] Add Comment', comment});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });
  }

  addCommentReply(comment: CommentModel, message: string) {
    let reply = new Reply(
      this.getNewCommentId(),
      message,
      new Date(),
      0,
      comment.user.username,
      this.localStorageService.getData('currentUser')
    );
    this.store.dispatch({type: '[Comment] Add Reply', commentId:comment.id, reply});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });

  }

  addReply(parentComment: CommentModel, parentReply: ReplyModal, message: string) {
    let reply = new Reply(
      this.getNewCommentId(),
      message,
      new Date(),
      0,
      parentReply.user.username,
      this.localStorageService.getData('currentUser')
    );
    this.store.dispatch({type: '[Comment] Add Reply', commentId: parentComment.id, reply});
    this.store.select(selectComments).pipe(take(1)).subscribe(comments => {
      this.localStorageService.saveData('comments', comments);
    });

  }
}
