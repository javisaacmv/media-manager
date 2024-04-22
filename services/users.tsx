import { AxiosResponse } from "axios";
import httpService from ".";
import { CreateUserType } from "@/types";

const usersService = {
  login: async (
    email: string,
    password: string
  ): Promise<AxiosResponse<any>> => {
    return await httpService.post("/auth/login", { email, password });
  },
  createUser: async (body: CreateUserType): Promise<AxiosResponse<any>> => {
    return await httpService.post("/users/create", body);
  },
  register: async (body: CreateUserType): Promise<AxiosResponse<any>> => {
    return await httpService.post("/users/register", body);
  },
};

export default usersService;
