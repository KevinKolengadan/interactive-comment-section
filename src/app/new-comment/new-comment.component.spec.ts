import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentComponent } from './new-comment.component';
import {AppState} from "../shared/state/app-state";
import {provideMockStore} from "@ngrx/store/testing";
import {CommentService} from "../shared/service/comment.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NewCommentComponent', () => {
  let component: NewCommentComponent;
  let fixture: ComponentFixture<NewCommentComponent>;
  const initialState: AppState = {
    user: {
      "image": {
        "png": "./images/avatars/yoda.png"
      },
      "username": "yoda"
    },
    comments: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommentComponent ],
      providers: [
        provideMockStore({initialState}),
        CommentService
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
