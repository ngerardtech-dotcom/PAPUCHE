const papuche = document.getElementById("papuche");
const coeur = document.getElementById("coeur");
const scoreAffichage = document.getElementById("score");
const musik = document.getElementById("musik");

let score = 0;
let vitesse = 3;
let viesPerdues = 0;
let positionX = window.innerWidth / 2;

// Lancer la musique quand le jeu démarre
let musiqueLancee = false;

// Lancer la musique à la première interaction
function lancerMusique() {
    if (!musiqueLancee) {
        musik.volume = 0.6;
        musik.play();
        musiqueLancee = true;
    }
}


// Déplacement Papuche
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") positionX -= 30;
    if (e.key === "ArrowRight") positionX += 30;

    positionX = Math.max(0, Math.min(window.innerWidth - 120, positionX));
    papuche.style.left = positionX + "px";
});

// Animation des cœurs
function tomberCoeur() {
    let y = -50;
    let x = Math.random() * (window.innerWidth - 50);

    coeur.style.left = x + "px";

    const interval = setInterval(() => {
        y += vitesse;
        coeur.style.top = y + "px";

        const papucheRect = papuche.getBoundingClientRect();
        const coeurRect = coeur.getBoundingClientRect();

        if (
            coeurRect.bottom >= papucheRect.top &&
            coeurRect.left < papucheRect.right &&
            coeurRect.right > papucheRect.left
        ) {
            score++;
            vitesse += 0.3;
            scoreAffichage.textContent = "Score : " + score;

            // Animation du saut
            papuche.classList.add("jump");
            setTimeout(() => papuche.classList.remove("jump"), 400);

            coeur.style.top = "-50px";
            clearInterval(interval);
            tomberCoeur();
        }

        if (y > window.innerHeight) {
            viesPerdues++;
            if (viesPerdues >= 3) {
                alert("GAME OVER ! Score final : " + score);
                location.reload();
            }
            coeur.style.top = "-50px";
            clearInterval(interval);
            tomberCoeur();
        }

    }, 20);
}

tomberCoeur();
