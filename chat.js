document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  const activeChat = JSON.parse(localStorage.getItem('activeChat'));

  const loadChat = () => {
    const messages = JSON.parse(localStorage.getItem(activeChat.name)) || [];
    chatBox.innerHTML = '';
    messages.forEach((message) => {
      const messageElement = document.createElement('p');
      messageElement.textContent = message;
      chatBox.appendChild(messageElement);
    });
  };

  sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      const messages = JSON.parse(localStorage.getItem(activeChat.name)) || [];
      messages.push(`You: ${message}`);
      localStorage.setItem(activeChat.name, JSON.stringify(messages));
      loadChat();
      chatInput.value = '';
    }
  });

  loadChat();
});
