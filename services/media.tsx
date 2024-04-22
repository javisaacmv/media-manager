import { AxiosResponse } from "axios";
import httpService from ".";
import { Content } from "@/types";

const mediaService = {
  getAll: async (params: string): Promise<AxiosResponse<any>> => {
    return await httpService.get("/media" + params);
  },
  getById: async (
    id: string
  ): Promise<AxiosResponse<{ msg: string; media: Content }>> => {
    return await httpService.get(`/media/byId/${id}`);
  },
  uploadImg: async (body: any): Promise<AxiosResponse<any>> => {
    return await httpService.post("/media/image", body);
  },
  create: async (body: Content): Promise<AxiosResponse<any>> => {
    return await httpService.post("/media", body);
  },
};

export default mediaService;
