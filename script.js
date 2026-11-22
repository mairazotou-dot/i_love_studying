

// Put your PNGs in an "images" folder next to index.html,
// then list their file names here.
const images = [
  "images/gun.png",
  "images/mug.png",
  "images/holy.png",
  "images/yes.jpeg",
  "images/glitter.gif",
  "images/eat.png",
  "images/bow.png",
  "images/flaccid.png",
];


const distance = 80; // pixels the mouse must move before a new image appears
let index = 0;
let lastX = 0;
let lastY = 0;

// Preload so there's no flicker
images.forEach(src => { new Image().src = src; });

window.addEventListener("mousemove", (e) => {
  if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < distance) return;

  lastX = e.clientX;
  lastY = e.clientY;

  const img = document.createElement("img");
  img.src = images[index];
  img.className = "trail-img";
  img.draggable = false;
  img.style.setProperty("--x", e.clientX + "px");
  img.style.setProperty("--y", e.clientY + "px");
  img.style.setProperty("--r", (Math.random() * 6 - 3) + "deg");
  img.addEventListener("animationend", () => img.remove());
  document.body.appendChild(img);

  index = (index + 1) % images.length;
});











//register in platform 

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("first-name").value.trim(),
    surname: document.getElementById("last-name").value.trim(),
    course: document.getElementById("course").value
  };

  sessionStorage.setItem("student", JSON.stringify(student));
  window.location.href = "study/study.html";
});





//toggle sleep
sleep.addEventListener('click', (e) => {
  e.stopPropagation();
  popup.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!popup.contains(e.target)) {
    popup.classList.remove('show');
  }
});