// Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Audio elements
    const popSound = document.getElementById("audio");
    const gameOverSound = document.getElementById("audio1");
    const victorySound = document.getElementById("audio2");

    // Game variables
    let start;
    let score = 0;
    const maxScore = 30;
    const timeLimit = 1.25;

    // Helper to play sound
    function playSound(audio) {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(err => console.log("Audio play failed:", err));
        }
    }

    // Get random color
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Show random shape
    function shapeAppear() {
        const shape = document.getElementById("shape");
        const width = Math.random() * 150 + 50; // 50px to 200px
        const maxWidth = window.innerWidth - width;
        const maxHeight = window.innerHeight - width;

        const top = Math.random() * maxHeight;
        const left = Math.random() * maxWidth;

        shape.style.width = width + "px";
        shape.style.height = width + "px";
        shape.style.top = top + "px";
        shape.style.left = left + "px";
        shape.style.borderRadius = Math.random() > 0.5 ? "50%" : "0%";
        shape.style.backgroundColor = getRandomColor();
        shape.style.display = "block";

        start = new Date().getTime(); // Start time for reaction tracking
    }

    // Show next shape after delay
    function appearAfterDelay() {
        setTimeout(shapeAppear, Math.random() * 1000 + 300); // 300ms to 1300ms
    }

    // Shape click event
    document.getElementById("shape").addEventListener("click", function () {
        const shape = document.getElementById("shape");
        shape.style.display = "none";
        playSound(popSound);

        const end = new Date().getTime();
        const timeTaken = (end - start) / 1000;
        document.getElementById("timeTaken").textContent = `Time Taken = ${timeTaken.toFixed(2)} sec`;
        score++;

        if (score >= maxScore) {
            document.getElementById("won").style.display = "block";
            playSound(victorySound);
        } else if (timeTaken > timeLimit) {
            document.getElementById("playAgain").style.display = "block";
            document.getElementById("Score").textContent = `Your Score : ${score}`;
            playSound(gameOverSound);
        } else {
            appearAfterDelay(); // Continue game if time limit not exceeded
        }
    });

    // Start button logic
    document.getElementById("start").addEventListener("click", function () {
        score = 0;
        document.getElementById("start").style.display = "none";
        document.getElementById("playAgain").style.display = "none";
        document.getElementById("won").style.display = "none";
        document.getElementById("timeTaken").textContent = "";
        document.getElementById("Score").textContent = "";

        appearAfterDelay(); // Start game by showing first shape
    });
});
