import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {provideMockStore} from "@ngrx/store/testing";
import {AppState} from "./shared/state/app-state";
import {CommentsComponent} from "./comments/comments.component";

describe('AppComponent', () => {
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
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        CommentsComponent
      ],
      providers: [
        provideMockStore({initialState})
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
