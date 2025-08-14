// Warten, bis die Seite geladen ist
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".pulse");

    if (!button) {
        console.error("Button nicht gefunden!");
        return;
    }

    // Klick-Event
    button.addEventListener("click", () => {
        alert("Du hast den Button geklickt!");
        
        // Beispiel: Buttonfarbe kurz ändern
        button.style.backgroundColor = "#34d17b";
        setTimeout(() => {
            button.style.backgroundColor = "#27c2f6";
        }, 500);
    });
});
