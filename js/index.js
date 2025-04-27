// Smoothly hide welcome text and show login page
setTimeout(() => {
  document.querySelector(".welcome-text").classList.add("hide");
  document.querySelector(".container").classList.add("show");
}, 3800);

// Generate twinkling stars
function createStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = window.innerHeight + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  document.body.appendChild(star);

  setTimeout(() => star.remove(), 5000);
}

// Generate orbiting friendship icons
function createFriendshipIcon() {
  const icon = document.createElement("div");
  icon.className = "friendship-icon";
  icon.style.left = "50%";
  icon.style.top = "50%";
  icon.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(icon);

  setTimeout(() => icon.remove(), 12000);
}

setInterval(createStar, 500);
setInterval(createFriendshipIcon, 2000);

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (username === "samako" && password === "28042019") {
    window.location.href = "welcome.html";
  } else {
    error.classList.add("show");
    setTimeout(() => error.classList.remove("show"), 3000);
  }
});
