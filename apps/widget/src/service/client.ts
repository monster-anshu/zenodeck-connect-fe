import axios, { type AxiosResponse } from "axios";

export const client = axios.create({
  adapter: "fetch",
  baseURL: "/api/v1/connect",
});

const commonResponseInterceptor = (response: AxiosResponse) => {
  const data = response.data as ApiResponse;
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
