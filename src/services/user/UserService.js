import axios from "@/axios";

class UserService {
  async create(user) {
    return axios.post(`/users`, user);
  }

  async verificationCode(user) {
    return axios.post(`/verification-code`, user);
  }

  async login(user) {
    return axios.post(`/login`, user);
  }
}

export default new UserService();
