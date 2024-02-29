import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import config from "../Components/utils/Configuration";
const url = process.env.REACT_APP_API_URL;

const chatsService = async (ChatId) => {
  try {
    const response = await axios.get(
      `http://localhost:7071/api/chat/chat/${ChatId}`,
      config
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const chatMessagesService = async (chatId) => {
  try {
    const response = await axios.get(
      `http://localhost:7071/api/message/${chatId}`,
      config
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const chatServices = {
  chatsService,
  chatMessagesService,
};

export default chatServices;
