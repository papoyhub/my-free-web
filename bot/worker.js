export default {
    async fetch(request) {

        if(request.method !== "POST"){
            return new Response(
                JSON.stringify({
                    message:"Bot online"
                }),
                {
                    headers:{
                        "Content-Type":
                        "application/json"
                    }
                }
            );
        }

        const data =
            await request.json();

        const message =
            String(data.message || "")
            .toLowerCase();

        let reply;

        if(message.includes("halo") ||
           message.includes("hai")){

            reply =
                "Halo! 👋 Senang bertemu denganmu.";

        }else if(message.includes("siapa")){

            reply =
                "Aku adalah bot sederhana yang berjalan di cloud.";

        }else if(message.includes("termux")){

            reply =
                "Termux bisa digunakan untuk membuat dan mengelola banyak proyek.";

        }else if(message.includes("bantu")){

            reply =
                "Tentu! Jelaskan apa yang ingin kamu lakukan.";

        }else{

            reply =
                "Aku menerima pesanmu: " +
                data.message +
                "\\n\\nAku masih bot sederhana, tetapi nanti bisa kita kembangkan.";
        }

        return new Response(
            JSON.stringify({reply}),
            {
                headers:{
                    "Content-Type":
                    "application/json"
                }
            }
        );
    }
}
