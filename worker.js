export default {
  async fetch(request) {
    const url = new URL(request.url);

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

    return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>My Free Web</title>
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
  line-height:1.5;
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
  min-width:0;
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
</style>
</head>

<body>
<main>

<section class="hero">
<div class="badge">● ONLINE</div>
<h1>My<br><span>Free Web</span></h1>
<p>Website dan bot berjalan di Cloudflare.</p>
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
