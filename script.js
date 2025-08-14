document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".pulse");

    elements.forEach(el => {
        el.style.transition = "transform 0.6s ease-in-out";
        setInterval(() => {
            el.style.transform = "scale(1.05)";
            setTimeout(() => {
                el.style.transform = "scale(1)";
            }, 300);
        }, 1000);
    });
});
