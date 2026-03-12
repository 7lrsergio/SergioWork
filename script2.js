function checkboxes() {
  const triggerBottom = window.innerHeight / 5 * 4;
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
  

window.addEventListener('scroll', checkboxes);
window.addEventListener('load', checkboxes); // trigger on load too


// ============================


document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("chatWidget");
  const toggle = document.getElementById("chatToggle");
  const close  = document.getElementById("chatClose");

  if (!widget || !toggle || !close) return;

  function openWidget() {
    widget.classList.add("is-open");
    widget.classList.add("is-open1");
  }

  function closeWidget() {
    widget.classList.remove("is-open");
    widget.classList.remove("is-open1");
  }

  function toggleWidget() {
    widget.classList.toggle("is-open");
    widget.classList.toggle("is-open1");
  }

  // 1) click button -> toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleWidget();
  });

  // 2) close button
  close.addEventListener("click", (e) => {
    e.stopPropagation();
    closeWidget();
  });

  // 3) click anywhere else -> close (optional but feels nice)
  document.addEventListener("click", (e) => {
    if (!widget.classList.contains("is-open")) return;
    if (!widget.classList.contains("is-open1")) return;
    if (!widget.contains(e.target)) closeWidget();
  });

  // 4) ESC key closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWidget();
  });
});


////////////////////////////////////////////////////////////

// ─── CHAT MESSAGING ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const body    = document.querySelector(".chat-body");
  const messages = document.getElementById("chatMessages");
  const input   = document.querySelector(".chat-input");
  const sendBtn = document.querySelector(".chat-send");

  if (!body || !messages || !input || !sendBtn) return;

  let hintRemoved = false;
  let dotsInterval = null;

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function appendMessage(text, sender) {
    if (!hintRemoved) {
      const hint = messages.querySelector(".chat-hint");
      if (hint) hint.remove();
      hintRemoved = true;
    }

    const div = document.createElement("div");
    div.classList.add("chat-message", sender); // "user" or "bot"
    div.textContent = text;
    messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function setLoading(on) {
    input.disabled = on;
    sendBtn.disabled = on;
  }

  // ----- Typing Indicator (while waiting for server) -----
  function addTypingIndicator() {
    // prevent duplicates
    removeTypingIndicator();

    const div = document.createElement("div");
    div.className = "chat-message bot typing";
    div.id = "typing-indicator";
    div.innerHTML = `Bot is typing<span class="typing-dots">.</span>`;
    messages.appendChild(div);
    scrollToBottom();

    let dots = 1;
    dotsInterval = setInterval(() => {
      const dotsEl = div.querySelector(".typing-dots");
      if (!dotsEl) return;
      dotsEl.textContent = ".".repeat(dots);
      dots = (dots % 3) + 1;
    }, 350);
  }

  function removeTypingIndicator() {
    if (dotsInterval) {
      clearInterval(dotsInterval);
      dotsInterval = null;
    }
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }

  // ----- Typewriter Effect (when reply arrives) -----
  function typeMessage(text, speed = 15) {
    if (!hintRemoved) {
      const hint = messages.querySelector(".chat-hint");
      if (hint) hint.remove();
      hintRemoved = true;
    }

    const div = document.createElement("div");
    div.className = "chat-message bot";
    div.textContent = "";
    messages.appendChild(div);
    scrollToBottom();

    let i = 0;

    function step() {
      if (i < text.length) {
        div.textContent += text.charAt(i);
        i++;
        scrollToBottom();
        setTimeout(step, speed);
      }
    }

    step();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    appendMessage(text, "user");
    setLoading(true);

  
    addTypingIndicator();

    const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3001/api/chat"
      : "https://sergiowork.onrender.com";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      // remove typing + type the response
      removeTypingIndicator();
      typeMessage(data.reply, 15);

    } catch (err) {
      removeTypingIndicator();
      appendMessage("Sorry, something went wrong. Try again later.", "bot");
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  // Click Send button
  sendBtn.addEventListener("click", sendMessage);

  // Press Enter in input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
