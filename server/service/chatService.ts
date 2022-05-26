import { Repository } from "typeorm";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";
import HttpException from "../util/errorUtils";
import { UserEntity } from "../entity/UserEntity";
import { GroupEntity } from "../entity/GroupEntity";
import Logger from "../util/logger";

export default class ChatService {
  constructor(
    private chatRepo: Repository<ChatMessageEntity>,
    private userRepo: Repository<UserEntity>,
    private groupRepo: Repository<GroupEntity>
  ) {}

  public async addMessage(message: string, userId: string, groupId: string) {
    const user = await this.userRepo.findOneBy({ uuid: userId });
    const group = await this.groupRepo.findOneBy({ uuid: groupId });
    if (!user || !group)
      throw new HttpException(
        "Something went wrong getting user or group",
        500
      );
    const messageEntity = new ChatMessageEntity(message, user, group);

    try {
      return await this.chatRepo.save(messageEntity);
    } catch (e: any) {
      Logger.error("chatService", e.toString());
      throw new HttpException(e, 500);
    }
  }

  public async getMessages(groupId: string, userId: string) {
    const group = await this.groupRepo.findOneBy({ uuid: groupId });
    const groupMembers = await group?.users;
    const memberIds = groupMembers?.map((m) => m.user.uuid);
    const isMember = memberIds?.includes(userId) || false;
    Logger.debug("get_messages", isMember.toString());
    if (!isMember) throw new HttpException("Unauthorized", 401);

    const messages = await this.chatRepo.find({
      where: {
        group: {
          uuid: groupId,
        },
      },
      relations: ["user"],
    });
    if (messages.length === 0) throw new HttpException("No messages", 204);

    return messages.map((message) => {
      return {
        message: message.message,
        userName: message.user.userName,
        timestamp: message.timestamp,
        userId: message.user.uuid,
      };
    });
  }
}
