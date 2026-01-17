const params = new URLSearchParams(window.location.search);
const payAmount = Number(params.get("pay")) || 0;

document.getElementById("amount").innerText =
  "Rp " + payAmount.toLocaleString("id-ID");
