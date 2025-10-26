const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const sideToggle = document.getElementById('sideToggle');
const sidebar = document.querySelector('.sidebar');

sideToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});


// Append a message
function appendMessage(content, sender = "user") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");

  if (sender === "bot") {
    msgDiv.innerHTML = `<i class="fa fa-robot"></i><p>${content}</p>`;
  } else {
    msgDiv.innerHTML = `<p>${content}</p>`;
  }

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message
sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage(message, "user");
    userInput.value = "";

    // Placeholder bot response (for now)
    setTimeout(() => {
      appendMessage("I'm thinking... (Gemini API response will appear here)", "bot");
    }, 800);
  }
});

// Send message with Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
