const WA_NUMBER = "6285641046457";

function orderBot(botName){
  const message = `Halo, saya ingin membeli ${botName}.`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function contactAdmin(){
  const message = "Halo NEXABOT, saya ingin bertanya tentang produk bot.";
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function sendReview(){
  const name = document.getElementById("reviewName");
  const rating = document.getElementById("reviewRating");
  const text = document.getElementById("reviewText");
  const message = document.getElementById("reviewMessage");

  if(!name || !rating || !text) return;

  const nama = name.value.trim();
  const komentar = text.value.trim();
  const nilai = Number(rating.value);

  if(!nama || !komentar){
    message.textContent = "⚠️ Nama dan ulasan wajib diisi.";
    return;
  }

  const stars =
    "★".repeat(nilai) +
    "☆".repeat(5 - nilai);

  const review = document.createElement("div");
  review.className = "review";

  review.innerHTML = `
    <div class="review-top">
      <strong>${escapeHTML(nama)}</strong>
      <span class="stars">${stars}</span>
    </div>

    <p class="review-text">
      "${escapeHTML(komentar)}"
    </p>

    <span class="simulated">
      ULASAN PENGUNJUNG
    </span>

    <div class="reply">
      <b>NEXABOT</b><br>
      Terima kasih atas ulasan kamu! 💚
    </div>
  `;

  const grid = document.getElementById("reviewGrid");

  if(grid){
    grid.prepend(review);
  }

  name.value = "";
  text.value = "";

  message.textContent =
    "✓ Ulasan berhasil ditambahkan.";

  review.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
}

function escapeHTML(text){
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
