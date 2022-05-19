import { createChatBotMessage } from "react-chatbot-kit";
import Cookies from "universal-cookie";
import AvatarBot from "./AvatarBot";
import AvatarUser from "./AvatarUser";
let cookie = new Cookies()
const config = {
  botName: 'GLbot',  
initialMessages: [createChatBotMessage(`Hola ${cookie.get('user')?.user?.name || ''} ¿En qué puedo ayudarte?`)],
  customComponents: {
    userAvatar: (props) => <AvatarBot {...props}></AvatarBot>,
    botAvatar: (props) => <AvatarUser {...props}></AvatarUser>
  }
}

export default config