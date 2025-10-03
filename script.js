/* ---------- custom cursor + dynamic labels ---------- */
(() => {
  const follower   = document.querySelector('.cursor-follower');
  const cursorText = document.getElementById('cursorText');
  if (!follower || !cursorText) return;

  // ① remember idle vs hover sizes
  const defaultSize = getComputedStyle(follower)
                        .getPropertyValue('--cursor-size').trim();
  const defaultFont = getComputedStyle(cursorText).fontSize;
  const hoverSize   = '90px';
  const hoverFont   = '20px';

  const defaultMsg = cursorText.textContent;
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  follower.hidden = false;

  window.addEventListener('mousemove', e => {
    follower.style.transform =
      `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

 

  // ② on hover in: swap text *and* bump sizes
  document.addEventListener('mouseenter', e => {
    const el = e.target.closest('[data-cursor]');
    if (!el) return;

    cursorText.textContent = el.dataset.cursor;

    follower.style.setProperty('--cursor-size',      hoverSize);
    follower.style.setProperty('--cursor-font-size', hoverFont);
  }, true);

  // ③ on hover out: restore both
  document.addEventListener('mouseleave', e => {
    if (!e.target.closest('[data-cursor]')) return;

    cursorText.textContent = defaultMsg;

    follower.style.setProperty('--cursor-size',      defaultSize);
    follower.style.setProperty('--cursor-font-size', defaultFont);
  }, true);
})();



/* script.js */
document.addEventListener('DOMContentLoaded', () => {
  const optionBar = document.getElementById('options');
  const texts     = document.querySelectorAll('.text');

  optionBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.option');
    if (!btn) return;                 

    const targetId = btn.dataset.target; 

    // 1️⃣ toggle active class on buttons
    document.querySelectorAll('.option')
        .forEach(b => b.classList.toggle('is-active', b === btn));

    // 2️⃣ show / hide the matching headline
    texts.forEach(t =>
      t.classList.toggle('is-visible', t.dataset.id === targetId)
    );
  });
});

  
  // run this as soon as the DOM is ready,
// and *before* you call revealSpans()
document.querySelectorAll('.texts .reveal').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';          // clear out the old text
    
    text.split('').forEach(char => {
      if (char === ' ') {
        // real space, real text node, so lines can wrap
        el.appendChild(document.createTextNode(' '));
      } else {
        // non-space gets its own span
        const s = document.createElement('span');
        s.textContent = char;
        el.appendChild(s);
      }
    });
  });
  

  /* cursor script :)*/
  
  
// after you’ve split your <p> text into spans…
// 1) grab all the spans you just generated
const spans = document.querySelectorAll('.texts span');


function revealSpans() {
  spans.forEach(span => {
    const { top } = span.getBoundingClientRect();
    if (top < window.innerHeight - 140) {
      span.classList.add('visible');
    } else {
      span.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealSpans);
revealSpans();







// nogood yer

