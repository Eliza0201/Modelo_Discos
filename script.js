const disk = document.querySelector("#movingDisk");
const animateButton = document.querySelector("#animateDisk");
const revealButtons = document.querySelectorAll(".reveal-btn");
const quizForm = document.querySelector("#quizForm");
const resetQuiz = document.querySelector("#resetQuiz");
const quizScore = document.querySelector("#quizScore");
const mobileMenuButton = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector("#mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-links .nav-link");

const answers = {
  q1: {
    correct: "b",
    message: "Correcto: cada disco tiene área πr²."
  },
  q2: {
    correct: "a",
    message: "Correcto: el radio es la distancia desde el eje x hasta la curva, es decir f(x)."
  },
  q3: {
    correct: "a",
    message: "Correcto: en discos no hay hueco interior; en arandelas sí."
  },
  q4: {
    correct: "b",
    message: "Correcto: si el radio se expresa como función de y, se integra con dy."
  },
  q5: {
    correct: "b",
    message: "Correcto: el radio es 3x y en discos siempre se eleva al cuadrado."
  },
  q6: {
    correct: "a",
    message: "Correcto: dx o dy representa el grosor infinitesimal de cada disco."
  },
  q7: {
    correct: "c",
    message: "Correcto: el volumen se expresa en unidades cúbicas."
  }
};

animateButton?.addEventListener("click", () => {
  disk?.classList.toggle("is-animated");
  animateButton.textContent = disk?.classList.contains("is-animated") ? "Pausar animación" : "Animar disco";
});

revealButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const solution = document.getElementById(button.dataset.target);
    const isVisible = solution.classList.toggle("is-visible");
    button.textContent = isVisible ? "Ocultar solución" : "Revelar solución";
  });
});

quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;

  Object.entries(answers).forEach(([question, data]) => {
    const selected = quizForm.querySelector(`input[name="${question}"]:checked`);
    const feedback = document.querySelector(`#feedback-${question}`);

    if (!selected) {
      feedback.textContent = "Selecciona una respuesta para recibir retroalimentación.";
      feedback.className = "feedback incorrect";
      return;
    }

    if (selected.value === data.correct) {
      score += 1;
      feedback.textContent = data.message;
      feedback.className = "feedback correct";
    } else {
      feedback.textContent = "Incorrecto. Revisa la fórmula y el significado geométrico del disco.";
      feedback.className = "feedback incorrect";
    }
  });

  quizScore.textContent = `Resultado: ${score} de 7 respuestas correctas.`;
});

resetQuiz?.addEventListener("click", () => {
  quizForm.reset();
  document.querySelectorAll(".feedback").forEach((feedback) => {
    feedback.textContent = "";
    feedback.className = "feedback";
  });
  quizScore.textContent = "";
});

const closeMobileMenu = () => {
  mobileMenuButton?.classList.remove("is-open");
  mobileMenuButton?.setAttribute("aria-expanded", "false");
  mobilePanel?.classList.remove("is-open", "show");
  document.body.classList.remove("mobile-nav-open");
};

mobileMenuButton?.addEventListener("click", () => {
  const isOpen = mobileMenuButton.classList.toggle("is-open");
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  mobilePanel?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("mobile-nav-open", isOpen);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

mobilePanel?.querySelector(".btn-close")?.addEventListener("click", () => {
  closeMobileMenu();
});

mobilePanel?.addEventListener("shown.bs.offcanvas", () => {
  mobileMenuButton?.classList.add("is-open");
  mobileMenuButton?.setAttribute("aria-expanded", "true");
  mobilePanel.classList.add("is-open");
  document.body.classList.add("mobile-nav-open");
});

mobilePanel?.addEventListener("hidden.bs.offcanvas", () => {
  closeMobileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    document.body.classList.contains("mobile-nav-open") &&
    mobilePanel &&
    mobileMenuButton &&
    !mobilePanel.contains(target) &&
    !mobileMenuButton.contains(target)
  ) {
    closeMobileMenu();
  }
});
