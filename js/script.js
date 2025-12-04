const calculateBttn = document.getElementById('calculate');
const aPaginaInput = document.getElementById('alturaPagina');
const interInput = document.getElementById('interlineado');
const filasInput = document.getElementById('cantFilas');
const margenesInput = document.getElementById('tamMargenes');
const measureInput = document.getElementById('measure');
const linXFilaInput = document.getElementById('linXFila');
let currentMeasure = measureInput.value;
let alturaPagina = parseFloat(aPaginaInput.value.replace(/,/g, '.'));
let interlineado = parseFloat(interInput.value.replace(/,/g, '.'));
let cantidadDeFilas = parseFloat(filasInput.value.replace(/,/g, '.'));
let cantidadDeMedianiles = cantidadDeFilas - 1;
let medianilDeFilas = interlineado;




const inputs = document.querySelectorAll('input');
for (const input of inputs) {
    input.oninput = () => {
        updateValues();
    }
}

measureInput.onchange = () => {
    const oldMeasure = currentMeasure;
    const newMeasure = measureInput.value;

    const altura = parseFloat(aPaginaInput.value.replace(/,/g, '.'));

    if (!isNaN(altura)) {
        alturaPagina = convertHeight(oldMeasure, newMeasure, altura);
        aPaginaInput.value = alturaPagina.toFixed(2);
    }

    currentMeasure = newMeasure;
};



calculateBttn.onclick = () => {
    updateValues();
    hideHint();  // reset from previous calculation

    // === REQUIRED FIELD CHECK ===
    if (
        alturaPagina === "" ||
        interlineado === "" ||
        cantidadDeFilas === ""
    ) {
        showHint("Completa interlineado, altura de página y cantidad de filas.");
        return;
    }

    // Parse numbers safely
    const aPag = parseFloat(alturaPagina);
    const inter = parseFloat(interlineado);
    const filas = parseInt(cantidadDeFilas);
    const medianiles = filas - 1;

    // === Calculate lines per page ===
    const lineasPorPagina = calcCantidadDeLineasPorPagina(inter, currentToPt(currentMeasure, aPag));

    if (!isFinite(lineasPorPagina) || lineasPorPagina <= 0) {
        showHint("El interlineado es demasiado grande para la altura de página.");
        return;
    }

    // === Determine lines per row ===
    let linXFila;

    if (linXFilaInput.value !== "") {
        linXFila = parseInt(linXFilaInput.value);
    } else {
        linXFila = calcCantidadDeLineasPorFila(
            lineasPorPagina,
            filas,
            medianiles
        );
        linXFilaInput.value = linXFila;
    }

    if (!isFinite(linXFila) || linXFila <= 0) {
        showHint("La cantidad de líneas por fila no es válida para esta grilla.");
        return;
    }

    // === Margin calculation ===
    const marg = calcTamañoDeMargenes(
        linXFila,
        filas,
        medianiles,
        inter,
        currentToPt(currentMeasure, aPag)
    );

    if (!isFinite(marg)) {
        showHint("Los valores proporcionados no permiten calcular márgenes.");
        return;
    }

    if (marg < 0) {
        showHint("La grilla no entra en la altura de la página. Reduce líneas o aumenta la altura.");
        return;
    }

    // === SUCCESS ===
    margenesInput.value = marg.toFixed(3);
    drawGrid({
    pageHeight: currentToPt(currentMeasure, aPag),
    filas,
    inter,
    medianiles,
    linXFila,
    margen: marg
});

};


function updateValues() {
    alturaPagina = parseFloat(aPaginaInput.value.replace(/,/g, '.'));
    interlineado = parseFloat(interInput.value.replace(/,/g, '.'));
    cantidadDeFilas = parseFloat(filasInput.value.replace(/,/g, '.'));
    cantidadDeMedianiles = cantidadDeFilas - 1;
    medianilDeFilas = interlineado;
}




function convertHeight(oldM, newM, h) {
    if (oldM === newM) return h;

    if (oldM === "cm" && newM === "mm") return cmToMm(h);
    if (oldM === "cm" && newM === "pt") return cmToPt(h);
    if (oldM === "cm" && newM === "px") return cmToPx(h);

    if (oldM === "mm" && newM === "cm") return mmToCm(h);
    if (oldM === "mm" && newM === "pt") return mmToPt(h);
    if (oldM === "mm" && newM === "px") return mmToPx(h);

    if (oldM === "pt" && newM === "mm") return ptToMm(h);
    if (oldM === "pt" && newM === "cm") return ptToCm(h);
    if (oldM === "pt" && newM === "px") return ptToPx(h);

    if (oldM === "px" && newM === "mm") return pxToMm(h);
    if (oldM === "px" && newM === "cm") return pxToCm(h);
    if (oldM === "px" && newM === "pt") return pxToPt(h);

    return h;
}



function calcCantidadDeLineasPorPagina(inter, aPagina) {
    return Math.trunc(aPagina/inter);
}

function calcCantidadDeLineasPorFila(linTotales, cFilas, cMedianiles) {
    return Math.trunc(((linTotales - cMedianiles) / cFilas)) ;
}

function calcTamañoDeMargenes(cLinFilas, cFilas, cMedianiles, inter, aPagina) {
    return (aPagina - (((cLinFilas*cFilas) + cMedianiles) * inter))/2;
}

function calcAlturaDePagina(inter, cFilas, cMedianiles, cLinFilas) {
    return  (cLinFilas * cFilas + cMedianiles) * inter
}
