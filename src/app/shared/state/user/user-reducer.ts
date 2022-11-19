import {UserModal} from '../../model/user.model';
import {createReducer, on} from "@ngrx/store";
import {setUser} from "./user.actions";

export const initialState: UserModal = {} as UserModal;

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => user)
)

