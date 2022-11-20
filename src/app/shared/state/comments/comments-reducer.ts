import {CommentModel} from "../../model/comment.model";
import {createReducer, on} from "@ngrx/store";
import {
  addComment, addReply,
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
  on(addComment, (state, {comment}) => [...state, comment]),
  on(addReply, (state, {commentId, reply}) => {
    return state.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    });
  }),
  on(removeComment, (state, {id}) =>  {
    return state.reduce((comments: CommentModel[], comment) => {
      if(comment.id !== id) {
        comments.push({
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== id)
        });
      }
      return comments;
    }, []);
  }),
  on(updateComment, (state, {id, updatedComment}) => {
    return state.map(comment => {
      if(comment.id === id) {
        return {
          ...comment,
          content: updatedComment,
          createdAt: new Date()
        };
      } else {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if(reply.id === id) {
              return {
                ...reply,
                content: updatedComment,
                createdAt: new Date()
              };
            }
            return reply;
          })
        }
      }
    })
  }),
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
