import {UserModal} from "./user.model";

export interface ReplyModal {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  replyingTo: string;
  user: UserModal;
  currentUserUpvoted?: boolean;
  currentUserDownvoted?: boolean;
}

export class Reply implements ReplyModal {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  replyingTo: string;
  user: UserModal;
  currentUserUpvoted?: boolean;
  currentUserDownvoted?: boolean;

  constructor(id: number, content: string, createdAt: Date, score: number, replyingTo: string, user: UserModal) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.replyingTo = replyingTo;
    this.user = user;
  }
}
