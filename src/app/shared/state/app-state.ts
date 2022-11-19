import {UserModal} from "../model/user.model";
import {CommentModel} from "../model/comment.model";

export interface AppState {
  user: UserModal;
  comments: CommentModel[];
}
