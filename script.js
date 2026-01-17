const BACKEND_URL = "https://api.neoparty.web.id/verify";

// Menangkap data dari URL
const params = new URLSearchParams(window.location.search);
const payAmount = Number(params.get("pay")) || 0;
const playerId = params.get("id") || "Tidak Diketahui";
const productName = params.get("name") || "Top Up";

// Tampilkan nominal ke layar
const amountEl = document.getElementById("amount");
if (amountEl) amountEl.innerText = "Rp " + payAmount.toLocaleString("id-ID");

// Tampilkan ID Pemain ke layar agar user yakin
const idEl = document.getElementById("player-id-display");
if (idEl) idEl.innerText = playerId;

async function verify() {
    const statusEl = document.getElementById("status");
    const fileInput = document.getElementById("proof");
    const file = fileInput && fileInput.files[0];

    if (!file) {
        statusEl.innerText = "Silakan upload bukti pembayaran.";
        return;
    }

    statusEl.innerText = "Memverifikasi pembayaran... Mohon tunggu.";

    try {
        const form = new FormData();
        form.append("expectedAmount", payAmount);
        form.append("playerId", playerId);      // Kirim ID ke VPS
        form.append("productName", productName); // Kirim Nama Produk ke VPS
        form.append("proof", file);

        const res = await fetch(BACKEND_URL, {
            method: "POST",
            body: form
        });

        const data = await res.json();

        if (data.status === "SUCCESS") {
            window.location.href = "/success.html";
        } else {
            statusEl.innerText = "Verifikasi gagal. Pastikan nominal transfer sesuai.";
        }
    } catch (err) {
        statusEl.innerText = "Gagal. Silahkan ulangi";
        console.error(err);
    }
}
