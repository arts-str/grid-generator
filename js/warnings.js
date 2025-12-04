function showHint(msg) {
    const h = document.getElementById("hint");
    h.textContent = msg;
    h.style.display = "block";
}

function hideHint() {
    const h = document.getElementById("hint");
    h.style.display = "none";
}
