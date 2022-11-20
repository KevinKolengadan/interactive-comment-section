import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./shared/state/user/user-reducer";
import {commentsReducer} from "./shared/state/comments/comments-reducer";
import {CommentService} from "./shared/service/comment.service";
import {LocalStorageService} from "./shared/service/localStorage.service";
import { EffectsModule } from '@ngrx/effects';
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TimeAgePipe} from "./shared/pipe/timeAge.pipe";
import { CommentsComponent } from './comments/comments.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {DeleteDialog} from "./shared/dialog/delete-dialog/delete-dialog";
import {MatDialogModule} from "@angular/material/dialog";
import { NewCommentComponent } from './new-comment/new-comment.component';
import {AsPipe} from "./shared/pipe/As.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    TimeAgePipe,
    AsPipe,
    CommentsComponent,
    DeleteDialog,
    NewCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      user: userReducer,
      comments: commentsReducer
    }),
    EffectsModule.forRoot([]),
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    CommentService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
