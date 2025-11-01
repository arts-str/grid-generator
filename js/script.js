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
    input.oninput = () =>{
        updateValues();
    }
}

measureInput.onchange = () =>{
    if (aPaginaInput.value !== '') {
        updateValues();
        aPaginaInput.value = alturaPagina.toFixed(2);
    }
}

calculateBttn.onclick = () => {
    
    updateValues();
    
    let linXFila;
    if (linXFilaInput.value !== '') {
        linXFila = parseInt(linXFilaInput.value);
    } else{
        linXFila = calcCantidadDeLineasPorFila(calcCantidadDeLineasPorPagina(interlineado, currentToPt(currentMeasure, alturaPagina)), cantidadDeFilas, cantidadDeMedianiles);
        linXFilaInput.value = calcCantidadDeLineasPorFila(calcCantidadDeLineasPorPagina(interlineado, currentToPt(currentMeasure, alturaPagina)), cantidadDeFilas, cantidadDeMedianiles);

    }
    margenesInput.value = calcTamañoDeMargenes(linXFila, cantidadDeFilas, cantidadDeMedianiles, interlineado, currentToPt(currentMeasure, alturaPagina)).toFixed(3);
    console.log(currentToPt(currentMeasure, alturaPagina));
}

function updateValues() {
    alturaPagina = aPaginaInput.value.replace(/,/g, '.');
    updateAltura(currentMeasure, measureInput.value, parseFloat(aPaginaInput.value.replace(/,/g, '.')));
    interlineado = parseFloat(interInput.value);
    cantidadDeFilas = parseFloat(filasInput.value);
    cantidadDeMedianiles = cantidadDeFilas - 1;
    medianilDeFilas = interlineado;
    currentMeasure = measureInput.value;
}

function updateAltura(currentMeasure, newMeasure, altura) {
    switch (true) {
        //CM
        case currentMeasure === "cm" && newMeasure === "mm":
            alturaPagina = cmToMm(altura)
            break;
        case currentMeasure === "cm" && newMeasure === "pt":
            alturaPagina = cmToPt(altura)
            break;
        case currentMeasure === "cm" && newMeasure === "px":
            alturaPagina = cmToPx(altura)
            break;
        //MM
        case currentMeasure === "mm" && newMeasure === "cm":
            alturaPagina = mmToCm(altura)
            break;
        case currentMeasure === "mm" && newMeasure === "pt":
            alturaPagina = mmToPt(altura)
            break;
        case currentMeasure === "mm" && newMeasure === "px":
            alturaPagina = mmToPx(altura)
            break;
        //PT
        case currentMeasure === "pt" && newMeasure === "mm":
            alturaPagina = ptToMm(altura)
            break;
        case currentMeasure === "pt" && newMeasure === "cm":
            alturaPagina = ptToCm(altura)
            break;
        case currentMeasure === "pt" && newMeasure === "px":
            alturaPagina = ptToPx(altura)
            break;
        //PX
        case currentMeasure === "px" && newMeasure === "mm":
            alturaPagina = pxToMm(altura)
            break;
        case currentMeasure === "px" && newMeasure === "cm":
            alturaPagina = pxToCm(altura)
            break;
        case currentMeasure === "px" && newMeasure === "pt":
            alturaPagina = pxToPt(altura)
            break;
        default:
            break;
    }
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