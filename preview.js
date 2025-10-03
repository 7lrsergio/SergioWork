
document.addEventListener('DOMContentLoaded', () => {
  const panel    = document.getElementById('preview');
  const closeBtn = document.getElementById('closePreview');
  const vid      = document.getElementById('prevVid');
  const titleEl  = document.getElementById('prevTitle');
  const descEl   = document.getElementById('prevDesc');
  const toolsEl  = document.getElementById('prevTools');

  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  function isWide() {
    return mediaQuery.matches;
  }

  function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
    return !(
      domRect1.top    > domRect2.bottom ||
      domRect1.right  < domRect2.left   ||
      domRect1.bottom < domRect2.top    ||
      domRect1.left   > domRect2.right
    );
  }

  function show(card) {
    titleEl.textContent = card.dataset.title  || '';
    descEl .textContent = card.dataset.desc   || '';
    toolsEl.textContent = card.dataset.tools  || '';

    const vidSrc = card.dataset.video;
    if (vidSrc) {
      if (vid.src !== vidSrc) {
        vid.src = vidSrc;
        vid.load();
      }
      vid.style.display = 'block';
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.style.display = 'none';
    }
    panel.classList.add('show');
  }

  function hide() {
    panel.classList.remove('show');
    vid.pause();
  }

  document.querySelectorAll('.project-card').forEach(card => {
    function maybeShow() {

      if (isWide()) show(card);
    }
    function maybeHide() {
      if (isWide()) hide();
    }
    card.addEventListener('mouseenter', maybeShow);
    card.addEventListener('focus', maybeShow);
    card.addEventListener('mouseleave', maybeHide);
    card.addEventListener('blur', maybeHide);


    card.addEventListener('click', () => {
      if (!isWide()) {
        panel.classList.contains('show') ? hide() : show(card);
      }
    });
  });

  closeBtn.addEventListener('click', hide);
  panel.addEventListener('click', e => {
    if (e.target === panel) hide();
  });

  function handleMediaChange(e) {
    if (!e.matches && panel.classList.contains('show')) {
      hide();
    }
  }
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleMediaChange);
  }
});
