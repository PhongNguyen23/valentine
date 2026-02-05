const heartsLayer = document.getElementById("hearts");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resetBtn = document.getElementById("resetBtn");
const questionScreen = document.getElementById("question-screen");
const thankyouScreen = document.getElementById("thankyou-screen");
const gifContainers = document.querySelectorAll(".gif_container");

let yesScale = 1;
let noClicks = 0;
const noMessages = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️",
];

const spawnHeart = () => {
  const heart = document.createElement("div");
  heart.className = "floating-heart";

  const size = 12 + Math.random() * 16;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 4;
  const delay = Math.random() * 2;

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${left}%`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;

  heartsLayer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
};

setInterval(spawnHeart, 350);

noBtn.addEventListener("click", () => {
  noClicks += 1;
  yesScale = Math.min(yesScale + 0.2, 3.6);
  yesBtn.style.transform = `scale(${yesScale})`;

  noBtn.classList.remove("shake");
  void noBtn.offsetWidth;
  noBtn.classList.add("shake");

  const messageIndex = Math.min(noClicks - 1, noMessages.length - 1);
  noBtn.textContent = noMessages[messageIndex];

  gifContainers.forEach((container) => {
    container.classList.remove("wiggle");
    void container.offsetWidth;
    container.classList.add("wiggle");
  });
});

yesBtn.addEventListener("click", () => {
  questionScreen.classList.add("hidden");
  thankyouScreen.classList.remove("hidden");

  for (let i = 0; i < 14; i += 1) {
    setTimeout(spawnHeart, i * 120);
  }
});

resetBtn.addEventListener("click", () => {
  thankyouScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  yesScale = 1;
  noClicks = 0;
  yesBtn.style.transform = "scale(1)";
  noBtn.textContent = "No";
});
