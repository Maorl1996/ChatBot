import axios from "axios";
import { config } from "../../config/constants";

const MessageApi = {
  async fetchMessages() {
    try {
      const result = await axios.get(`${config.BE_URL}/messages`);

      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async postMessage(userId: string, message: string, parentId?: string) {
    try {
      return await axios.post(`${config.BE_URL}/message/${userId}`, {
        message,
        parentId,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getReplies(messageId?: string) {
    try {
      const result = await axios.get(
        `${config.BE_URL}/message/${messageId}/replies`
      );
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default MessageApi;
