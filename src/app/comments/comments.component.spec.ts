import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import {provideMockStore} from "@ngrx/store/testing";
import {AppState} from "../shared/state/app-state";
import {NewCommentComponent} from "../new-comment/new-comment.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
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
      declarations: [ CommentsComponent,
        NewCommentComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
      ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
