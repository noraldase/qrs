const params = new URLSearchParams(window.location.search);
const pay = Number(params.get("pay")) || 0;

document.getElementById("amount").innerText =
  "Rp " + pay.toLocaleString("id-ID");

async function verify() {
  const file = document.getElementById("proof").files[0];
  if (!file) {
    document.getElementById("status").innerText =
      "Upload bukti pembayaran";
    return;
  }

  document.getElementById("status").innerText =
    "Memverifikasi pembayaran...";

  const form = new FormData();
  form.append("expectedAmount", pay);
  form.append("proof", file);

  const res = await fetch("/verify", {
    method: "POST",
    body: form
  });

  const data = await res.json();

  if (data.status === "SUCCESS") {
    window.location.href = "/success.html";
  } else {
    document.getElementById("status").innerText =
      "Verifikasi gagal, coba ulangi";
  }
}
