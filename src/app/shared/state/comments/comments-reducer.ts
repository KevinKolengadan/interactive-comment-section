import {CommentModel} from "../../model/comment.model";
import {createReducer, on} from "@ngrx/store";
import {
  addComment,
  downvoteComment,
  removeComment,
  setComments,
  updateComment,
  upvoteComment
} from "./comments.actions";
import {CommentService} from "../../service/comment.service";
import {ReplyModal} from "../../model/reply.model";

export const initialState: CommentModel[] = [];

export const commentsReducer = createReducer(
  initialState,
  on(setComments, (state, {comments}) => comments),
  on(addComment, (state, comment) => [...state, comment]),
  on(removeComment, (state, {id}) =>  state.filter(comment => comment.id !== id)),
  on(updateComment, (state, {id, changes}) => state.map(comment => comment.id === id ? changes : comment)),
  on(upvoteComment, (state, {id}) => {
    return state.map(comment => {
      if (comment.id === id) {
        return CommentService.upvote(comment) as CommentModel;
      } else {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if(reply.id === id) {
              return CommentService.upvote(reply) as ReplyModal;
            } else {
              return reply;
            }
          })
        }
      }
    });
  }),
  on(downvoteComment, (state, {id}) => {
    return state.map(comment => {
      if (comment.id === id) {
        return CommentService.downvote(comment) as CommentModel;
      } else {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if(reply.id === id) {
              return CommentService.downvote(reply) as ReplyModal;
            } else {
              return reply;
            }
          })
        }
      }
    });
  })
);
