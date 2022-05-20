import { AppDataSource } from "../server";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";

export default AppDataSource.getRepository(ChatMessageEntity).extend({});
