// CM
function cmToPt(cm) { return cm * 28.3464567 }
function cmToPx(cm) { return cm * 28.3464567 }
function cmToMm(cm) { return cm * 10 }

// PT
function ptToCm(pt) { return pt / 28.3464567 }
function ptToMm(pt) { return pt / 2.83464567 }
function ptToPx(pt) { return pt } // = pt * 1.3333333

// MM
function mmToPt(mm) { return mm * 2.83464567 }
function mmToCm(mm) { return mm / 10 }
function mmToPx(mm) { return mm * 2.83464567 }

// PX
function pxToCm(px) { return px / 28.3464567 }
function pxToMm(px) { return px / 2.83464567 }
function pxToPt(px) { return px} // = pt * 1.3333333



function currentToPt(currentMeasure, altura) {
    switch (currentMeasure) {
        case "px":
            return pxToPt(altura);
        case "cm":
            return cmToPt(altura);
        case "mm":
            return mmToPt(altura);
        default:
            return altura
    }
}