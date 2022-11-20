import {createAction, props} from "@ngrx/store";
import {CommentModel} from "../../model/comment.model";
import {ReplyModal} from "../../model/reply.model";

export const setComments = createAction('[Comment] Set Comments', props<{comments: CommentModel[]}>());
export const addComment = createAction('[Comment] Add Comment', props<{ comment: CommentModel }>());
export const addReply = createAction('[Comment] Add Reply', props<{ commentId: number, reply: ReplyModal }>());
export const removeComment = createAction('[Comment] Remove Comment', props<{ id: number }>());
export const updateComment = createAction('[Comment] Update Comment', props<{ id: number, updatedComment: string }>());
export const upvoteComment = createAction('[Comment] Upvote Comment', props<{ id: number }>());
export const downvoteComment = createAction('[Comment] Downvote Comment', props<{ id: number }>());
