// ================================
// KONFIGURASI BACKEND (WAJIB)
// ================================
const BACKEND_URL = "https://reservation-bool-entered-speech.trycloudflare.com//verify";

// ================================
// AMBIL NOMINAL DARI URL
// contoh: ?pay=100
// ================================
const params = new URLSearchParams(window.location.search);
const payAmount = Number(params.get("pay")) || 0;

// Tampilkan nominal (HANYA TEKS, QR TETAP STATIS)
const amountEl = document.getElementById("amount");
if (amountEl) {
  amountEl.innerText = "Rp " + payAmount.toLocaleString("id-ID");
}

// ================================
// VERIFIKASI PEMBAYARAN (UPLOAD + OCR)
// ================================
async function verify() {
  const statusEl = document.getElementById("status");
  const fileInput = document.getElementById("proof");
  const file = fileInput && fileInput.files[0];

  if (!file) {
    if (statusEl) statusEl.innerText = "Silakan upload bukti pembayaran.";
    return;
  }

  if (statusEl) statusEl.innerText = "Memverifikasi pembayaran...";

  try {
    const form = new FormData();
    form.append("expectedAmount", payAmount);
    form.append("proof", file);

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      body: form
    });

    if (!res.ok) {
      throw new Error("Gagal menghubungi backend");
    }

    const data = await res.json();

    if (data.status === "SUCCESS") {
      // Berhasil → redirect
      window.location.href = "/success.html";
    } else {
      if (statusEl) statusEl.innerText = "Verifikasi gagal. Coba ulangi.";
    }
  } catch (err) {
    if (statusEl) statusEl.innerText = "Terjadi kesalahan. Coba lagi.";
    console.error(err);
  }
}
