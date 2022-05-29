import { ChatComponent } from "./ChatComponent";

export function Chat() {
  const params = new URLSearchParams(window.location.search);
  return <ChatComponent groupId={params.get("group_id")} />;
}
