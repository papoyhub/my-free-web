async function sendMessage(){

    const input =
        document.getElementById("message");

    const box =
        document.getElementById("messages");

    const text =
        input.value.trim();

    if(!text) return;

    box.innerHTML +=
        `<div class="user">${escapeHtml(text)}</div>`;

    input.value="";

    const loading =
        document.createElement("div");

    loading.className="bot";
    loading.textContent="Bot sedang berpikir...";

    box.appendChild(loading);

    try{

        const response =
            await fetch(
                "https://GANTI-DENGAN-URL-WORKER.workers.dev",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        message:text
                    })
                }
            );

        const data =
            await response.json();

        loading.textContent =
            data.reply || "Bot tidak memberikan jawaban.";

    }catch(error){

        loading.textContent =
            "Bot belum terhubung.";

    }

    box.scrollTop=box.scrollHeight;
}

function escapeHtml(text){

    const div=document.createElement("div");

    div.textContent=text;

    return div.innerHTML;
}

document
.getElementById("message")
.addEventListener("keydown",e=>{

    if(e.key==="Enter"){
        sendMessage();
    }

});
