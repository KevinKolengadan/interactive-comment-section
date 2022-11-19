import {createAction, props} from "@ngrx/store";
import {UserModal} from "../../model/user.model";

export const setUser = createAction('[User] Set User', props<{user: UserModal}>());
