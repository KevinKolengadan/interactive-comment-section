import {createSelector} from "@ngrx/store";
import {AppState} from "../app-state";
import {CommentModel} from "../../model/comment.model";

export const selectComments = createSelector(
  (state: AppState) => state.comments,
  (comments: CommentModel[]) => [... comments].sort((a, b) => b.score - a.score)
);
