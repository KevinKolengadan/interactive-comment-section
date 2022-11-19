import {createAction, props} from "@ngrx/store";
import {CommentModel} from "../../model/comment.model";

export const setComments = createAction('[Comment] Set Comments', props<{comments: CommentModel[]}>());
export const addComment = createAction('[Comment] Add Comment', props<CommentModel>());
export const removeComment = createAction('[Comment] Remove Comment', props<{ id: number }>());
export const updateComment = createAction('[Comment] Update Comment', props<{ id: number, changes: CommentModel }>());
export const upvoteComment = createAction('[Comment] Upvote Comment', props<{ id: number }>());
export const downvoteComment = createAction('[Comment] Downvote Comment', props<{ id: number }>());
