import {UserModal} from "./user.model";
import {ReplyModal} from "./reply.model";

export interface CommentModel {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  user: UserModal;
  replies: ReplyModal[];
  currentUserUpvoted?: boolean;
  currentUserDownvoted?: boolean;
}

export class Comment implements CommentModel {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  user: UserModal;
  replies: ReplyModal[];
  currentUserUpvoted?: boolean;
  currentUserDownvoted?: boolean;

  constructor(id: number, content: string, createdAt: Date, score: number, user: UserModal, replies: ReplyModal[]) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.user = user;
    this.replies = replies;
  }
}
