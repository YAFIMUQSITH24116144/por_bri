// 1. System Live Clock
function updateClock() {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const clockEl = document.getElementById('live-clock');
  if (clockEl) clockEl.textContent = `${timeStr} UTC`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Interactive Drag & Drop Board Logic
let activeCard = null;
let currentX, currentY, initialX, initialY;
let xOffset = 0, yOffset = 0;

const draggables = document.querySelectorAll('.draggable');

draggables.forEach(card => {
  card.addEventListener('mousedown', dragStart);
});

document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);

function dragStart(e) {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
  
  activeCard = e.currentTarget;
  xOffset = activeCard.dataset.x ? parseFloat(activeCard.dataset.x) : 0;
  yOffset = activeCard.dataset.y ? parseFloat(activeCard.dataset.y) : 0;

  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  activeCard.style.zIndex = "30";
}

function drag(e) {
  if (activeCard) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    activeCard.dataset.x = xOffset;
    activeCard.dataset.y = yOffset;

    activeCard.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(-1deg)`;
  }
}

function dragEnd() {
  if (activeCard) {
    activeCard.style.zIndex = "10";
    activeCard = null;
  }
}

// Reset Posisi Card
window.resetBoardPositions = function() {
  draggables.forEach(card => {
    card.style.transform = 'none';
    card.dataset.x = 0;
    card.dataset.y = 0;
  });
};

// 3. Metric-Supported Brutalist Modal System
window.openBrutalistModal = function(title, desc, imgSrc, metric1, metric2) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;

  const modalImg = document.getElementById('modal-img');
  if (modalImg && imgSrc) modalImg.src = imgSrc;

  const m1 = document.getElementById('modal-metric-1');
  const m2 = document.getElementById('modal-metric-2');
  if (m1 && metric1) m1.textContent = metric1;
  if (m2 && metric2) m2.textContent = metric2;

  const backdrop = document.getElementById('brutalist-modal-backdrop');
  const modal = document.getElementById('brutalist-modal');

  if (backdrop && modal) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
  }
};

window.closeBrutalistModal = function() {
  const backdrop = document.getElementById('brutalist-modal-backdrop');
  const modal = document.getElementById('brutalist-modal');

  if (backdrop && modal) {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
  }
};

// 4. Copy Email Toast
window.copyEmail = function() {
  const email = 'kristo@volchek-labs.io';
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.remove('-translate-y-24', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('-translate-y-24', 'opacity-0');
      }, 3000);
    }
  });
};