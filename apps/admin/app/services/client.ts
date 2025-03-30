import { USER_SERVICE_URL } from "@admin-env";
import axios, { AxiosError, type AxiosResponse } from "axios";

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

const commonErrorInterceptor = async (error: AxiosError<ApiResponse>) => {
  const status = error.response?.status;
  const redirect = error.response?.headers["x-zenodeck-redirect"];
  if (redirect) {
    window.location.href = redirect;
    await new Promise(() => {});
    return;
  }

  if (status === 401) {
    const url = new URL(USER_SERVICE_URL + "/login");
    url.searchParams.set("productId", "CAMPAIGN");
    url.searchParams.set("next", encodeURIComponent(window.location.href));
    window.location.href = url.toString();
    await new Promise(() => {});
    return;
  }

  const message =
    error.response?.data.message || error.response?.data.error || error.message;
  throw new Error(message);
};

client.interceptors.response.use(
  commonResponseInterceptor,
  commonErrorInterceptor
);

export type ApiResponse<Data = unknown> = Data & {
  isSuccess: boolean;
  error?: any;
  message?: any;
};
