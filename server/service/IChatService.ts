import { ChatMessageEntity } from "../entity/ChatMessageEntity";
import { UserEntity } from "../entity/UserEntity";

export interface IChatService {
  addMessage(
    message: string,
    userId: string,
    groupId: string
  ): Promise<ChatMessageEntity>;

  fetchUserById(userId: string): Promise<UserEntity | null>;

  getMessages(
    groupId: string,
    userId: string
  ): Promise<
    {
      message: string;
      userName: string;
      timestamp: Date | undefined;
      userId: string;
    }[]
  >;
}
