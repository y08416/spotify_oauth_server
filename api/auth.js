export default function handler(req, res) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const scopes = [
      "playlist-modify-public",
      "playlist-modify-private"
    ];
  
    console.log("🧪 redirect_uri from env:", redirect_uri);
  
    const query = new URLSearchParams({
      response_type: "code",
      client_id,
      scope: scopes.join(" "),
      redirect_uri
    });
  
    res.redirect(`https://accounts.spotify.com/authorize?${query.toString()}`);
  }