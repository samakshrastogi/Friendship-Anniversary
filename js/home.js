// Three.js 3D Cube
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
document.getElementById("cube").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const materials = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic1.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic2.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic3.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic4.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic5.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("images/pic6.jpg"),
  }),
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.from("h1", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
gsap.from("p", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
});
gsap.from(".timer", {
  opacity: 0,
  scale: 0.5,
  duration: 1,
  delay: 0.7,
  ease: "power2.out",
});
gsap.from(".distance", {
  opacity: 0,
  scale: 0.5,
  duration: 1,
  delay: 0.9,
  ease: "power2.out",
});
gsap.from(".slideshow", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 1.1,
  ease: "power2.out",
});
gsap.from(".timeline", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 1.3,
  ease: "power2.out",
});
gsap.from("button", {
  opacity: 0,
  scale: 0.5,
  duration: 1,
  delay: 1.5,
  ease: "elastic.out(1, 0.3)",
});

// Particles.js
particlesJS("particles", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffd700" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffd700",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// Real-Time Timer
function updateTimer() {
  const startDate = new Date("2019-04-28T00:00:00");
  const now = new Date();
  const diff = now - startDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.42)
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30.42)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById(
    "timer"
  ).textContent = `Together for ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}
updateTimer();
setInterval(updateTimer, 1000); // Update every second

// Slideshow
// Image Slideshow Logic
let specialCurrentSlide = 0;
const specialSlides = document.querySelectorAll(
  ".special-slideshow-container img"
);

function specialShowSlide(index) {
  specialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function specialNextSlide() {
  specialCurrentSlide = (specialCurrentSlide + 1) % specialSlides.length;
  specialShowSlide(specialCurrentSlide);
}

function specialPrevSlide() {
  specialCurrentSlide =
    (specialCurrentSlide - 1 + specialSlides.length) % specialSlides.length;
  specialShowSlide(specialCurrentSlide);
}

// Video Player Logic
const specialVideoList = [
  "images/video12.mp4",
  "images/video2.mp4",
  "images/video3.mp4",
  "images/video4.mp4",
  "images/video5.mp4",
  "images/video6.mp4",
  "images/video7.mp4",
  "images/video8.mp4",
  "images/video9.mp4",
  "images/video11.mp4",
  "images/video1.mp4",
];
let specialCurrentVideo = 0;
const specialVideoElement = document.getElementById("special-video");

function specialLoadVideo(index) {
  specialVideoElement.src = specialVideoList[index];
  specialVideoElement.play();
}

function specialNextVideo() {
  specialCurrentVideo = (specialCurrentVideo + 1) % specialVideoList.length;
  specialLoadVideo(specialCurrentVideo);
}

function specialPrevVideo() {
  specialCurrentVideo =
    (specialCurrentVideo - 1 + specialVideoList.length) %
    specialVideoList.length;
  specialLoadVideo(specialCurrentVideo);
}

function specialTogglePlay() {
  if (specialVideoElement.paused) {
    specialVideoElement.play();
  } else {
    specialVideoElement.pause();
  }
}

function specialUnmute() {
  specialVideoElement.muted = false;
  document.querySelector(".special-unmute-btn").style.display = "none";
}

// Load first video
specialLoadVideo(specialCurrentVideo);

// Secret Message
function revealSecret() {
  const secretSection = document.getElementById("secret");
  secretSection.classList.toggle("active");
  if (secretSection.classList.contains("active")) {
    gsap.fromTo(
      secretSection,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }
}

// Share Memory
function shareMemory() {
  window.location.href = "wishes.html";
}

// Responsive cube size
window.addEventListener("resize", () => {
  const size = window.innerWidth > 768 ? 300 : 200;
  renderer.setSize(size, size);
  camera.aspect = 1;
  camera.updateProjectionMatrix();
});

let started = false;

function animateCounter(target, endValue, duration) {
  let start = null;
  const element = document.getElementById(target);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const current = Math.min(
      Math.floor((progress / duration) * endValue),
      endValue
    );
    element.innerHTML = `${current} km`;

    if (current < endValue) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

window.addEventListener("scroll", () => {
  const container = document.getElementById("counterContainer");
  const position = container.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight && !started) {
    started = true;
    animateCounter("loveCounter", 1272, 5000);
  }
});
