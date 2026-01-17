const params = new URLSearchParams(window.location.search);
const payAmount = Number(params.get("pay")) || 0;

document.getElementById("amount").innerText =
  "Rp " + payAmount.toLocaleString("id-ID");

const QRIS =
"00020101021126570011ID.DANA.WWW011893600915306314656402090631465640303UMI51440014ID.CO.QRIS.WWW0215ID10200445049310303UMI52047ID5914FRESH WASH CAR6014Kab. Mojokerto61056138563047756";

QRCode.toCanvas(QRIS, { width: 220 }, (err, canvas) => {
  document.getElementById("qr").appendChild(canvas);
});

async function verify() {
  const file = document.getElementById("proof").files[0];
  if (!file) {
    document.getElementById("status").innerText =
      "Silakan upload bukti pembayaran";
    return;
  }

  document.getElementById("status").innerText = "Memverifikasi pembayaran...";

  const form = new FormData();
  form.append("expectedAmount", payAmount);
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
      "Verifikasi gagal, silakan coba lagi";
  }
}
