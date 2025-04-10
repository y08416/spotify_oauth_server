export default async function handler(req, res) {
    const code = req.query.code;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri
      }).toString()
    });
  
    const data = await tokenRes.json();
    res.status(200).json(data); // ← access_token を拡張に返す
  }