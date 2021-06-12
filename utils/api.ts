import axios from "axios";

export interface AccessToken {
  access_token: string;
  token_type: string;
  scope: string;
}

export const getAccessToken = async () => {
  const localAccessToken = localStorage.getItem("token");
  if (localAccessToken && localAccessToken !== "undefined") {
    return localAccessToken;
  } else {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const isCorrectState = url.searchParams.get("state") === btoa("123123");
    if (isCorrectState) {
      try {
        const response = await axios.get<AccessToken>(
          `/api/exchange-token/${authorizationCode}`
        );
        if (response.data) {
          const accessToken = response.data.access_token;
          localStorage.setItem("token", accessToken);
          return accessToken;
        }
      } catch {
        return "";
      }
    }
    return "";
  }
};

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
}

export const getRepositories = async () => {
  const response = await axios.get<Repository[]>(
    `${process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL}/user/repos?sort=created&direction=desc`
  );
  if (response.data) {
    return response.data;
  }

  return [];
};
