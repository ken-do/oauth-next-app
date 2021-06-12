import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { code } = req.query;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN_URL,
      {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/repositories",
        code,
      }
    );
    if (response.data) {
      res
        .status(200)
        .json(Object.fromEntries(new URLSearchParams(response.data)));
    } else {
      res.status(400);
    }
  }
};

export default handler;
