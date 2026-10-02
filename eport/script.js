const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");
const topButton = document.querySelector("#topButton");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    status.textContent = "ERROR // ALL FIELDS ARE REQUIRED.";
    status.style.color = "#ff7777";
    return;
  }

  if (!email.validity.valid) {
    status.textContent = "ERROR // ENTER A VALID EMAIL.";
    status.style.color = "#ff7777";
    return;
  }

  status.textContent = "TRANSMISSION ACCEPTED // MESSAGE READY.";
  status.style.color = "#b8ff36";
  form.reset();
});

window.addEventListener("scroll", () => {
  topButton.classList.toggle("visible", window.scrollY > 500);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
