import { Repository } from "typeorm";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";
import HttpException from "../util/httpException";

export default class ChatService {
  constructor(private chatRepo: Repository<ChatMessageEntity>) {}

  public async addMessage(message: ChatMessageEntity) {
    return await this.chatRepo
      .save(message)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        throw new HttpException(e, 500);
      });
  }

  public async getMessages(groupId: string) {
    return await this.chatRepo
      .find({
        where: {
          group: {
            uuid: groupId,
          },
        },
      })
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        throw new HttpException(e, 500);
      });
  }
}
