const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

let noClickCount = 0;
let isYesClicked = false;

function getRandomNumber(min, max) {
  // Calculate the random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function moveNoButton() {
  if (isYesClicked) return;
  
  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;
  const btnTop = btnNo.getBoundingClientRect().top;
  const btnLeft = btnNo.getBoundingClientRect().left;

  let newTop = btnTop;
  let newLeft = btnLeft;
  while (Math.abs(newTop - btnTop) < containerHeight / 3) {
    newTop = getRandomNumber(0, containerHeight - btnHeight);
  }

  while (Math.abs(newLeft - btnLeft) < containerWidth / 3) {
    newLeft = getRandomNumber(0, containerWidth - btnWidth);
  }

  btnNo.style.top = Math.floor(newTop) + "px";
  btnNo.style.left = Math.floor(newLeft) + "px";
}

// Support both mouse and touch events for mobile
btnNo.addEventListener("mouseover", moveNoButton);
btnNo.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Add click handler for No button with fun messages
btnNo.addEventListener("click", (e) => {
  if (isYesClicked) return;
  
  noClickCount++;
  const messages = [
    "Are you sure? 😢",
    "Please reconsider! 💔",
    "Think about it again! 🥺",
    "One more chance? 😭",
    "Pretty please? 🥰",
    "You're breaking my heart! 💔",
    "Last chance! 😊",
  ];
  
  if (noClickCount < messages.length) {
    btnNo.textContent = messages[noClickCount - 1];
    // Make button bigger to make it harder to click
    const currentSize = parseFloat(window.getComputedStyle(btnNo).fontSize);
    btnNo.style.fontSize = (currentSize * 0.9) + "px";
  } else {
    // After many tries, show a sweet message
    btnNo.textContent = "You can't say no! 😉";
    btnNo.style.fontSize = "1rem";
  }
  
  // Create floating hearts
  createFloatingHeart(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
});

btnYes.addEventListener("click", (e) => {
  isYesClicked = true;
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
  
  // Create confetti effect
  createConfetti();
  
  // Create floating hearts
  createFloatingHeart(e.clientX, e.clientY);
  
  // Add celebration message
  setTimeout(() => {
    const celebration = document.createElement("div");
    celebration.className = "celebration";
    celebration.innerHTML = "See you then, Precious! 💕";
    document.body.appendChild(celebration);
    setTimeout(() => celebration.classList.add("show"), 100);
  }, 500);
});

// Confetti effect
function createConfetti() {
  const colors = ["#ff6b9d", "#c44569", "#f8b500", "#ff6b6b", "#4ecdc4", "#ffe66d"];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 10);
  }
}

// Floating hearts effect
function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.textContent = "💖";
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.style.opacity = "0";
    heart.style.transform = `translateY(-100px) scale(1.5)`;
  }, 10);
  
  setTimeout(() => heart.remove(), 2000);
}
