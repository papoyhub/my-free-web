export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/robots.txt") {
      return new Response(`User-agent: *
Allow: /
Sitemap: https://my-free-web.syhab338.workers.dev/sitemap.xml`, {
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }

    if (url.pathname === "/sitemap.xml") {
      return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://my-free-web.syhab338.workers.dev/</loc>
  </url>
  <url>
    <loc>https://my-free-web.syhab338.workers.dev/login</loc>
  </url>
</urlset>`, {
        headers: {
          "Content-Type": "application/xml"
        }
      });
    }
    // =========================
    // LOGIN PAGE
    // =========================
    if (url.pathname === "/login" && request.method === "GET") {
      return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login - My Free Web</title>
<style>
*{box-sizing:border-box}
body{
  margin:0;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:Arial,sans-serif;
  color:white;
  background:radial-gradient(circle at top,#36206b,#090914 65%);
}
.box{
  width:min(390px,90%);
  padding:30px;
  border:1px solid #ffffff18;
  border-radius:22px;
  background:#ffffff0b;
  backdrop-filter:blur(15px);
}
h1{text-align:center}
.sub{text-align:center;color:#aaa;margin-bottom:25px}
label{display:block;margin:14px 0 7px}
input{
  width:100%;
  padding:14px;
  border:1px solid #ffffff20;
  border-radius:12px;
  background:#080811;
  color:white;
}
button{
  width:100%;
  margin-top:20px;
  padding:14px;
  border:0;
  border-radius:12px;
  background:#9b6cff;
  color:white;
  font-weight:bold;
}
a{
  display:block;
  text-align:center;
  margin-top:20px;
  color:#aaa;
}
</style>
</head>
<body>
<div class="box">
<h1>🔐 Login</h1>
<div class="sub">My Free Web Admin</div>

<form method="POST" action="/login">
<label>Username</label>
<input name="username" required>

<label>Password</label>
<input type="password" name="password" required>

<button type="submit">MASUK</button>
</form>

<a href="/">← Kembali ke website</a>
</div>
</body>
</html>`, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
    }

    // =========================
    // LOGIN PROCESS
    // =========================
    if (url.pathname === "/login" && request.method === "POST") {
      const form = await request.formData();

      const username = String(form.get("username") || "");
      const password = String(form.get("password") || "");

      if (username === "admin" && password === env.ADMIN_PASSWORD) {
        return new Response(null, {
          status: 302,
          headers: {
            "Location": "/admin",
            "Set-Cookie":
              "admin_session=1; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400"
          }
        });
      }

      return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login Gagal</title>
<style>
body{
  margin:0;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#090914;
  color:white;
  font-family:Arial;
}
a{color:#a97cff}
</style>
</head>
<body>
<div style="text-align:center">
<h2>❌ Login gagal</h2>
<p>Username atau password salah.</p>
<a href="/login">Coba lagi</a>
</div>
</body>
</html>`, {
        status: 401,
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
    }

    // =========================
    // ADMIN DASHBOARD
    // =========================
    if (url.pathname === "/admin") {
      const cookie = request.headers.get("Cookie") || "";

      if (!cookie.includes("admin_session=1")) {
        return Response.redirect(
          new URL("/login", request.url).toString(),
          302
        );
      }

      return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard</title>
<style>
*{box-sizing:border-box}
body{
  margin:0;
  font-family:Arial,sans-serif;
  color:white;
  background:#090914;
}
header{
  padding:18px 5%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#151122;
}
main{
  width:min(1000px,92%);
  margin:30px auto;
}
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:15px;
}
.card{
  padding:22px;
  border-radius:18px;
  background:#ffffff0a;
  border:1px solid #ffffff15;
}
.number{
  font-size:30px;
  font-weight:bold;
  color:#a97cff;
}
.logout{
  padding:10px 15px;
  border-radius:10px;
  background:#ef4444;
  color:white;
  text-decoration:none;
}
.links{
  margin-top:20px;
  display:grid;
  gap:12px;
}
.link{
  padding:16px;
  border-radius:12px;
  background:#ffffff0a;
  color:white;
  text-decoration:none;
}
</style>
</head>
<body>

<header>
<strong>⚡ MY FREE WEB ADMIN</strong>
<a class="logout" href="/logout">Logout</a>
</header>

<main>
<h1>Dashboard</h1>
<p>Selamat datang, Admin 👋</p>

<div class="grid">
<div class="card">
<div>Website</div>
<div class="number">ONLINE</div>
</div>

<div class="card">
<div>Bot Assistant</div>
<div class="number">ONLINE</div>
</div>

<div class="card">
<div>Admin</div>
<div class="number">1</div>
</div>
</div>

<div class="links">
<a class="link" href="/">🌐 Buka Website</a>
<a class="link" href="/api/chat">🤖 Bot API</a>
</div>

</main>
</body>
</html>`, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
    }

    // =========================
    // LOGOUT
    // =========================
    if (url.pathname === "/logout") {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/login",
          "Set-Cookie":
            "admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
        }
      });
    }

    // =========================
    // API CHAT
    // =========================
    if (url.pathname === "/api/chat" && request.method === "POST") {
      const data = await request.json();
      const message = String(data.message || "").toLowerCase();

      let reply;

      if (message.includes("halo") || message.includes("hai")) {
        reply = "Halo! 👋 Ada yang bisa saya bantu?";
      } else if (message.includes("termux")) {
        reply = "Termux bisa digunakan untuk membuat dan mengelola banyak proyek.";
      } else if (message.includes("bantu")) {
        reply = "Tentu! Jelaskan apa yang ingin kamu lakukan.";
      } else if (message.includes("siapa")) {
        reply = "Aku adalah bot yang berjalan langsung di Cloudflare.";
      } else {
        reply = "Aku menerima pesanmu: " + data.message;
      }

      return new Response(JSON.stringify({ reply }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // =========================
    // WEBSITE UTAMA
    // =========================
    return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>My Free Web-website gratis</title>
<meta name="description" content="My Free Web adalah website gratis dengan bot assistant dan berbagai fitur web.">
<style>
*{box-sizing:border-box}
body{
  margin:0;
  min-height:100vh;
  font-family:Arial,sans-serif;
  color:white;
  background:radial-gradient(circle at top,#36206b,#090914 60%);
}
main{
  width:min(900px,92%);
  margin:auto;
}
.hero{
  min-height:65vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.badge{
  width:max-content;
  padding:7px 12px;
  border:1px solid #63ffb077;
  border-radius:30px;
  color:#63ffb0;
  font-size:11px;
}
h1{
  font-size:clamp(48px,10vw,90px);
  line-height:.95;
  margin:25px 0;
}
h1 span{color:#a97cff}
p{color:#aaa8bb;line-height:1.7}
.chat{
  margin-bottom:80px;
  padding:25px;
  border:1px solid #ffffff16;
  border-radius:22px;
  background:#ffffff08;
}
#messages{
  min-height:180px;
  max-height:350px;
  overflow:auto;
  padding:10px;
}
.msg{
  max-width:80%;
  padding:12px 15px;
  margin:10px 0;
  border-radius:14px;
}
.bot{background:#251b3b}
.user{
  margin-left:auto;
  background:#7047b8;
}
.input{
  display:flex;
  gap:8px;
}
input{
  flex:1;
  padding:14px;
  border:1px solid #ffffff20;
  border-radius:12px;
  background:#080811;
  color:white;
}
button{
  padding:13px 18px;
  border:0;
  border-radius:12px;
  background:#9b6cff;
  color:white;
  font-weight:bold;
}
.admin{
  display:inline-block;
  margin-top:20px;
  padding:12px 18px;
  border-radius:12px;
  background:#9b6cff;
  color:white;
  text-decoration:none;
}
</style>
</head>

<body>
<main>

<section class="hero">
<div class="badge">● ONLINE</div>
<h1>My<br><span>Free Web</span></h1>
<p>Website dan bot berjalan di Cloudflare.</p>
<a class="admin" href="/login">🔐 Admin Login</a>
</section>

<section class="chat">
<h2>🤖 Bot Assistant</h2>

<div id="messages">
<div class="msg bot">Halo! 👋 Ada yang bisa saya bantu?</div>
</div>

<div class="input">
<input id="message" placeholder="Tulis pesan...">
<button onclick="send()">Kirim</button>
</div>
</section>

</main>

<script>
async function send(){
  const input=document.getElementById("message");
  const box=document.getElementById("messages");
  const text=input.value.trim();

  if(!text)return;

  const user=document.createElement("div");
  user.className="msg user";
  user.textContent=text;
  box.appendChild(user);

  input.value="";

  const bot=document.createElement("div");
  bot.className="msg bot";
  bot.textContent="Bot sedang berpikir...";
  box.appendChild(bot);

  try{
    const r=await fetch("/api/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:text})
    });

    const data=await r.json();
    bot.textContent=data.reply;
  }catch(e){
    bot.textContent="Bot sedang tidak tersedia.";
  }

  box.scrollTop=box.scrollHeight;
}

document.getElementById("message").addEventListener("keydown",e=>{
  if(e.key==="Enter")send();
});
</script>

</body>
</html>`, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8"
      }
    });
  }
};
