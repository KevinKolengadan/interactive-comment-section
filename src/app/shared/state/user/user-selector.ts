import {createSelector} from "@ngrx/store";
import {AppState} from "../app-state";
import {UserModal} from "../../model/user.model";

export const selectUser = createSelector(
  (state: AppState) => state.user,
  (user: UserModal) => user
);
export const isCurrentUsername = ( username: string) => createSelector(
  selectUser,
  (user: UserModal) => user.username === username
);
