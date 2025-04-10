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
    const accessToken = data.access_token;
  
    console.log("🎫 callback.js: トークン取得成功 →", accessToken);
  
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>認証成功</title></head>
        <body>
          <script>
            console.log("📤 callback.html: postMessage 送信中");
            window.opener?.postMessage({ type: 'SPOTIFY_TOKEN', token: '${accessToken}' }, '*');
            window.close();
          </script>
          <p>✅ Spotifyログイン成功！このウィンドウは自動で閉じます。</p>
        </body>
      </html>
    `);
  }