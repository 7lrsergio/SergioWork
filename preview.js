document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('preview');
  const closeBtn = document.getElementById('closePreview');
  const vid = document.getElementById('prevVid');
  const title = document.getElementById('prevTitle');
  const desc = document.getElementById('prevDesc');
  const tech = document.getElementById('prevTools');
  if (!panel || !closeBtn || !vid) return;

  const hover = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeCard = null;
  let pinned = false;
  let hoverTimer;
  let hideTimer;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'prevTitle');

  function autoplayAllowed() {
    return !reducedMotion.matches && !navigator.connection?.saveData;
  }

  // Preserve the original labeled text treatment without parsing HTML.
  function renderText(element, text) {
    element.replaceChildren();
    const parts = text.split(/(Problem —|Solution —|Impact —|Tech —)/g);
    parts.forEach(part => {
      if (/^(Problem|Solution|Impact|Tech) —$/.test(part)) {
        if ((part === 'Solution —' || part === 'Impact —') && element.childNodes.length) {
          element.append(document.createElement('br'), document.createElement('br'));
        }
        const label = document.createElement('span');
        label.className = 'preview-label';
        label.textContent = part;
        element.append(label);
      } else element.append(document.createTextNode(part));
    });
  }

  function show(card, pin = false) {
    pinned = pin;
    clearTimeout(hideTimer);
    activeCard = card;
    title.textContent = card.dataset.title || '';
    renderText(desc, card.dataset.desc || '');
    renderText(tech, card.dataset.tools || '');
    vid.setAttribute('aria-label', `${title.textContent} demo`);
    // Attribute comparison avoids comparing an absolute URL with a relative URL.
    if (vid.getAttribute('src') !== card.dataset.video) {
      vid.pause();
      vid.poster = card.dataset.poster || '';
      vid.src = card.dataset.video;
      vid.load();
    }
    panel.classList.add('show');
    if (autoplayAllowed()) vid.play().catch(() => { /* Native play control remains available. */ });
    else vid.pause();
  }

  function hide() {
    clearTimeout(hoverTimer);
    clearTimeout(hideTimer);
    panel.classList.remove('show');
    vid.pause();
    activeCard = null;
    pinned = false;
  }

  function scheduleHide() {
    clearTimeout(hoverTimer);
    hideTimer = setTimeout(() => {
      if (!pinned && !panel.matches(':hover') && !panel.contains(document.activeElement) && !activeCard?.contains(document.activeElement)) hide();
    }, 250);
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (pinned || !hover.matches || !autoplayAllowed()) return;
      clearTimeout(hideTimer);
      clearTimeout(hoverTimer);
      // Avoid fetching demos when the pointer merely passes over a card.
      hoverTimer = setTimeout(() => show(card), 120);
    });
    card.addEventListener('mouseleave', () => { if (hover.matches) scheduleHide(); });
    card.addEventListener('click', () => {
      clearTimeout(hoverTimer);
      show(card, true);
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        show(card, true);
        if (window.matchMedia('(max-width: 1024px)').matches) closeBtn.focus();
        else vid.focus();
      }
    });
  });
  panel.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  panel.addEventListener('mouseleave', () => { if (hover.matches) scheduleHide(); });
  closeBtn.addEventListener('click', () => {
    const card = activeCard;
    hide();
    card?.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeCard) {
      const card = activeCard;
      hide();
      card.focus();
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  hover.addEventListener('change', hide);
});
