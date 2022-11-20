import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import {provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../shared/state/app-state";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CommentService} from "../shared/service/comment.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Component, ViewChild} from "@angular/core";
import {CommentModel} from "../shared/model/comment.model";
import {ReplyModal} from "../shared/model/reply.model";
import {TimeAgePipe} from "../shared/pipe/timeAge.pipe";
import {AsPipe} from "../shared/pipe/As.pipe";
import {MatIconModule} from "@angular/material/icon";

describe('MessageComponent', () => {
  let component: TestMessageComponent;
  let fixture: ComponentFixture<TestMessageComponent>;
  const initialState: AppState = {
    user: {
      "image": {
        "png": "./images/avatars/yoda.png"
      },
      "username": "yoda"
    },
    comments: []
  }
  const comment: CommentModel = {
    "id": 1,
    "content": "This is a test comment",
    "createdAt": new Date(),
    "score": 12,
    "user": {
      "image": {
        "png": "./images/avatars/leiaskywalker.png"
      },
      "username": "leiaskywalker"
    },
    "replies": [
      {
        "id": 2,
        "content": "This is a test reply",
        "createdAt": new Date(),
        "score": 2,
        "replyingTo": "leiaskywalker",
        "user": {
          "image": {
            "png": "./images/avatars/yoda.png"
          },
          "username": "yoda"
        },
        currentUserUpvoted: true
      },
      {
        "id": 3,
        "content": "This is a downvoted reply",
        "createdAt": new Date(),
        "score": 4,
        "replyingTo": "yoda",
        "user": {
          "image": {
            "png": "./images/avatars/leiaskywalker.png"
          },
          "username": "leiaskywalker"
        },
        currentUserDownvoted: true
      }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent, TestMessageComponent,
        TimeAgePipe,
        AsPipe ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule
      ],
      providers: [
        provideMockStore({initialState}),
        MatDialog,
        CommentService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMessageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the message', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.message-text')?.textContent).toContain('This is a test comment');
  });
  it('should show the correct score', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.message-score')?.textContent).toContain('12');
  });
  it('should not highlight upvote', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.upvote.voted')).toBeNull();
  });
  it('should should show highlight vote for comments or reply you voted', () => {
    component.setInput(comment, comment.replies[0]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.upvote.voted')).not.toBeNull();
  });
  it('should not highlight upvote', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.upvote.voted')).toBeNull();
  });
  it('should should show highlight vote for comments or reply you upvoted', () => {
    component.setInput(comment, comment.replies[0]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.upvote.voted')).not.toBeNull();
  });
  it('should not highlight downvote', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.downvote.voted')).toBeNull();
  });
  it('should should show highlight vote for comments or reply you downvoted', () => {
    component.setInput(comment, comment.replies[1]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.downvote.voted')).not.toBeNull();
  });
  it('should not show YOU tag for others comments or replies', () => {
    component.setInput(comment, comment);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.you')).toBeNull();
  });
  it('should  show YOU tag for your comments or replies', () => {
    component.setInput(comment, comment.replies[0]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //query the element by class selector message-text
    expect(compiled.querySelector('.you')).not.toBeNull();
  });

});

@Component({
  selector: `host-component`,
  template: `<message [parentComment]="parentComment" [message]="message"></message>`
})
class TestMessageComponent {
  public parentComment?: CommentModel;
  public message?: CommentModel | ReplyModal;

  setInput(parentComment: CommentModel, message: CommentModel | ReplyModal) {
    this.parentComment = parentComment;
    this.message = message;
  }
}
