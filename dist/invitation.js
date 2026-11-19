const guestName = new URLSearchParams(location.search).get("name")?.trim();

if (guestName) {
  document.querySelector("#greeting").textContent = `Dear ${guestName.slice(0, 120)},`;
}

const start = Date.parse("2027-01-27T09:40:00+05:30");
const end = Date.parse("2027-01-27T10:30:00+05:30");
const countdown = document.querySelector("#countdown");
const title = document.querySelector("#countdown-title");
const clock = document.querySelector("#clock");
const units = ["days", "hours", "minutes", "seconds"].map(id => document.getElementById(id));
let timer;

function updateCountdown() {
  const now = Date.now();
  if (now >= start) {
    title.textContent = now < end ? "The wedding day is here!" : "Thank you for celebrating with us";
    clock.hidden = true;
    clearInterval(timer);
    return;
  }

  const remaining = Math.ceil((start - now) / 1000);
  const values = [
    Math.floor(remaining / 86400),
    Math.floor(remaining / 3600) % 24,
    Math.floor(remaining / 60) % 60,
    remaining % 60,
  ];
  units.forEach((unit, index) => {
    unit.textContent = String(values[index]).padStart(2, "0");
  });
}

if (Date.now() < start) {
  timer = setInterval(updateCountdown, 1000);
}
updateCountdown();
countdown.hidden = false;
