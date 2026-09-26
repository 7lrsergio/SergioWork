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

  // click button -> toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleWidget();
  });

  // close button
  close.addEventListener("click", (e) => {
    e.stopPropagation();
    closeWidget();
  });

  // click anywhere else -> close (optional but feels nice)
  document.addEventListener("click", (e) => {
    if (!widget.classList.contains("is-open")) return;
    if (!widget.classList.contains("is-open1")) return;
    if (!widget.contains(e.target)) closeWidget();
  });

  // ESC key closes
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

  let history = [];
  let sending = false;
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
    div.classList.add("chat-message", sender); // "user" 
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

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || sending) return;
    if (text.length > 2000) {
      appendMessage("Please keep your question under 2,000 characters.", "bot");
      return;
    }
    sending = true;

    input.value = "";
    appendMessage(text, "user");
    setLoading(true);

  
    addTypingIndicator();

    const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3001/api/chat"
      : "https://sergiowork.onrender.com/api/chat";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
        signal: AbortSignal.timeout(45000),
      });

      if (!res.ok) {
        throw new Error(res.status === 429
          ? "Too many questions right now. Please try again later or email Sergio at srgl1179@gmail.com."
          : "The assistant is temporarily unavailable. Try again or contact Sergio at srgl1179@gmail.com.");
      }
      const data = await res.json();
      if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("The assistant returned an empty reply. Please try again.");
      history.push({ role: "user", content: text }, { role: "assistant", content: data.reply });
      history = history.slice(-8);
      while (history.length && history.reduce((sum, item) => sum + item.content.length, 0) > 12000) history.splice(0, 2);
      removeTypingIndicator();
      appendMessage(data.reply, "bot");
    } catch (err) {
      removeTypingIndicator();
      appendMessage(err.name === "TimeoutError" || err.name === "TypeError"
        ? "The assistant could not connect. Please retry or email Sergio at srgl1179@gmail.com."
        : err.message, "bot");
    } finally {
      sending = false;
      setLoading(false);
      input.focus();
    }
  }

  // Click Send button
  sendBtn.addEventListener("click", sendMessage);


  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});