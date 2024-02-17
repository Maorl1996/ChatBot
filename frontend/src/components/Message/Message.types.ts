export interface MessageDetails {
  id: string;
  message: string;
  userName: string;
  userId: string;
  timestamp: Date;
  isQuestion: boolean;
  parentId?: string;
  isBot?: boolean;
}

export enum SendBy {
  ME = "me",
  OTHER = "other",
  BOT = "bot",
}
