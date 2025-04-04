import { sendToParent } from "@widget-utils/parent";
import axios, { type AxiosResponse } from "axios";
import { WebsiteService } from "./website.service";

export const client = axios.create({
  adapter: "fetch",
  baseURL: "/api/v1/connect",
});

const commonResponseInterceptor = (response: AxiosResponse) => {
  const data = response.data as ApiResponse;

  if ("authToken" in data && typeof data.authToken === "string") {
    sendToParent({ token: data.authToken });
    WebsiteService.token = data.authToken;
  }

  if (!data?.error) return response;
  console.log("Error on response", response.config.url);
  let message = "Something went wrong";
  message = data?.error || message;
  if (message === "PLAN_LIMIT") {
    message = "Your plan limit has been reached.";
  }
  throw new Error(message);
};

client.interceptors.response.use(commonResponseInterceptor);

export type ApiResponse<Data = unknown> = Data & {
  isSuccess: boolean;
  error?: any;
  message?: any;
};
