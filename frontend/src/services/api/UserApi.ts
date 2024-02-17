import axios from "axios";
import { config } from "config/constants";

const UserApi = {
  async createUser(userName: string) {
    try {
      return await axios.post(`${config.BE_URL}/user`, {
        userName,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default UserApi;
