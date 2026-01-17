const params = new URLSearchParams(window.location.search);
const payAmount = Number(params.get("pay"));

document.getElementById("amount").innerText =
    "Rp " + payAmount.toLocaleString("id-ID");

// QRIS statis kamu
const QRIS =
"00020101021126570011ID.DANA.WWW011893600915306314656402090631465640303UMI51440014ID.CO.QRIS.WWW0215ID10200445049310303UMI52047ID5914FRESH WASH CAR6014Kab. Mojokerto61056138563047756";

QRCode.toCanvas(document.createElement("canvas"), QRIS, {
    width: 220
}, (err, canvas) => {
    document.getElementById("qr").appendChild(canvas);
});

async function verify() {
    const file = document.getElementById("proof").files[0];
    if (!file) return alert("Upload bukti pembayaran");

    const form = new FormData();
    form.append("expectedAmount", payAmount);
    form.append("proof", file);

    document.getElementById("status").innerText = "Memverifikasi...";

    const res = await fetch("http://localhost:3000/verify", {
        method: "POST",
        body: form
    });

    const data = await res.json();

    if (data.status === "SUCCESS") {
        window.location.href = "/success.html";
    } else {
        document.getElementById("status").innerText =
            "Verifikasi gagal, silakan ulangi";
    }
}
