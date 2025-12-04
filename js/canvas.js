const canvas = document.getElementById("gridCanvas");
const canvasText = document.getElementById("previewText");
const ctx = canvas.getContext("2d");

// === Draw the layout visualization === //
function drawGrid({
    pageHeight,
    filas,
    inter,
    medianiles,
    linXFila,
    margen
}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasText.style.display = "inline";
    canvas.style.display = "inline";
    // ---- CANVAS SCALE ----
    // Scale page height to canvas height (padding included)
    const padding = 0;
    const usableHeight = canvas.height - padding * 2;

    const scale = usableHeight / pageHeight;

    // ---- Page rectangle ----
    const pageTop = padding;
    const pageBottom = padding + pageHeight * scale;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, pageTop, 600, pageHeight * scale);

    // ---- Top margin ----
    ctx.fillStyle = "rgba(200, 0, 0, 0.35)";
    ctx.fillRect(
        0,
        pageTop,
        600,
        margen * scale
    );

    // ---- Draw rows ----
    let y = pageTop + margen * scale;

    for (let f = 0; f < filas; f++) {

        // Row rectangle
        const rowHeight = linXFila * inter * scale;
        ctx.fillStyle = "rgba(0, 100, 255, 0.08)";
        ctx.fillRect(0, y, 600, rowHeight);

        // Lines inside each row
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.lineWidth = 1;

        for (let l = 1; l < linXFila; l++) {
            const ly = y + l * inter * scale;
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(600, ly);
            ctx.stroke();
        }

        y += rowHeight;

        // Medianil (space between rows)
        if (f < filas - 1) {
            const medianilHeight = inter * scale;
            ctx.fillStyle = "rgba(0,255,0,0.12)";
            ctx.fillRect(0, y, 600, medianilHeight);
            y += medianilHeight;
        }
    }

    // ---- Bottom margin ----
    ctx.fillStyle = "rgba(200, 0, 0, 0.35)";
    ctx.fillRect(
        0,
        pageBottom - margen * scale,
        600,
        margen * scale
    );
}
