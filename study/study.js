//pixel heart 



const img = document.getElementById('heart');
const wrap = img.parentElement;

const MAX_BLOCK = 40;  
const EASE = 0.04;     

const canvas = document.createElement('canvas');
canvas.className = 'pixel-canvas';
wrap.appendChild(canvas);
const ctx = canvas.getContext('2d');

const small = document.createElement('canvas'); 
const sctx = small.getContext('2d');

let block = 1;
let target = 1;
let raf;

function render() {
  const w = Math.max(1, Math.round(canvas.width / block));
  const h = Math.max(1, Math.round(canvas.height / block));

  small.width = w;
  small.height = h;
  sctx.drawImage(img, 0, 0, w, h);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(small, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}

function tick() {
  block += (target - block) * EASE;
  if (Math.abs(target - block) < 0.05) block = target;

  render();

  if (block !== target) {
    raf = requestAnimationFrame(tick);
  } else if (target === 1) {
    wrap.classList.remove('is-pixelated'); 
  }
}

function start(newTarget) {
  target = newTarget;
  if (target > 1) wrap.classList.add('is-pixelated');
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(tick);
}

function init() {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  wrap.addEventListener('mouseenter', () => start(MAX_BLOCK));
  wrap.addEventListener('mouseleave', () => start(1));
}

if (img.complete) init();
else img.addEventListener('load', init);






//rabbit hole text swap


const heart  = document.getElementById('heart');
const empty  = document.getElementById('empty');
const rabbit = document.getElementById('rabbit');
const rabbitText = document.getElementById('rabbit-text');


const quotes = [
  {
    text: `"It's not the world shaping your mind...<br>It's your mind shaping the world"`,
    author: 'Immanuel Kant',
    url: 'https://youtu.be/xgZEyJUn3bc?si=sdyAQZwLXlxk1EdF'
  },
  {
    text: `"If God did not exist, <br>it would be necessary to invent him."`,
    author: 'Voltaire',
    url: 'https://www.whitman.edu/VSA/trois.imposteurs.html'
  },
  {
    text: `"It is not enough to have a good mind;<br> the main thing is to use it well."`,
    author: 'René Descartes',
    url: 'https://www.earlymoderntexts.com/assets/pdfs/descartes1637.pdf'
  }
];

let index = 0;
let open = false;

function renderQuote() {
  const q = quotes[index];
  rabbitText.innerHTML =
    `${q.text}<br><a target="_blank" rel="noopener noreferrer" href="${q.url}">${q.author}</a>`;
}

function show() {
  renderQuote();
  empty.classList.add('is-visible');
  rabbit.classList.add('is-visible');
  open = true;
}

function hide() {
  empty.classList.remove('is-visible');
  rabbit.classList.remove('is-visible');
  open = false;
}

// click the heart: open, or (if already open) go to the next quote
document.querySelector('.pixel-wrap').addEventListener('click', () => {
  if (!open) {
    show();
  } else {
    index = (index + 1) % quotes.length;   
    renderQuote();
  }
});


// click anywhere else: close (clicks on the popup itself are ignored so the link works)
document.addEventListener('click', (e) => {
  if (!open) return;
  if (e.target.closest('.pixel-wrap') || e.target.closest('.rabbit')) return;
  hide();
});





// number hover: image follows the cursor
document.querySelectorAll('#numbers a').forEach(link => {
  const floatImg = document.getElementById(link.dataset.target);
  if (!floatImg) { console.warn('missing image for', link.dataset.target); return; }

  const move = (e) => {
  floatImg.style.transform =
    `translate(${e.clientX}px, ${e.clientY - 20}px) translate(-50%, -100%)`;
};

  link.addEventListener('mouseenter', (e) => {
    move(e);                                  // place it right away
    floatImg.classList.add('is-visible');
  });
  link.addEventListener('mousemove', move);
  link.addEventListener('mouseleave', () => floatImg.classList.remove('is-visible'));
});




//menu
const menuBtn = document.getElementById('menu');
  const panel   = document.getElementById('menuPanel');
  const xBtn    = document.getElementById('menuX');

  menuBtn.addEventListener('click', () => panel.classList.add('is-open'));
  xBtn.addEventListener('click', () => panel.classList.remove('is-open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') panel.classList.remove('is-open');
  });