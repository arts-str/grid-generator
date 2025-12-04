// === INPUT SANITIZATION FOR ALL NUMERIC INPUTS === //
const numericInputs = document.querySelectorAll('input[inputmode="decimal"], input[type="tel"]');

numericInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let v = input.value;

        // Replace comma with dot
        v = v.replace(/,/g, ".");

        // Remove all characters except digits and dots
        v = v.replace(/[^0-9.]/g, "");

        // Prevent more than one dot
        const parts = v.split(".");
        if (parts.length > 2) {
            v = parts[0] + "." + parts.slice(1).join("");
        }

        input.value = v;
    });

    // Remove leading dot (".5" → "0.5")
    input.addEventListener("blur", () => {
        if (input.value.startsWith(".")) {
            input.value = "0" + input.value;
        }
    });
});

// === INTEGER-ONLY INPUT: cantFilas === //
const cantFilasInput = document.getElementById("cantFilas");

cantFilasInput.addEventListener("input", () => {
    let v = cantFilasInput.value;

    // Remove EVERYTHING except digits
    v = v.replace(/\D+/g, "");

    // No decimals allowed
    cantFilasInput.value = v;
});

cantFilasInput.addEventListener("blur", () => {
    if (cantFilasInput.value === "" || cantFilasInput.value === "0") {
        cantFilasInput.value = "1"; // default safe value
    }
});

function isValidNumber(v) {
    return v !== "" && !isNaN(v) && isFinite(v);
}