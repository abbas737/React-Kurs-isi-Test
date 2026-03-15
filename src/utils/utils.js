import axios from "axios";
import { useTokens } from "../stores/TokenStore";

export const refreshTokens = async () => {
  try {
    const refreshToken = useTokens.getState().refreshToken;
    const setAccessToken = useTokens.getState().setAccessToken;

    const { data, statusText } = await axios.post(
      "http://localhost:5177/api/Auth/refresh-token",
      { refreshToken }
    );

    if (statusText === "OK") {
      setAccessToken(data.accessToken);
      return data.accessToken;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
  }
};