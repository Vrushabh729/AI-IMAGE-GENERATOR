async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");

    let userText = inputField.value.trim();
    if (userText === "") return;

    // Show user message
    let userMessage = `<p class="user-message">${userText}</p>`;
    chatBox.innerHTML += userMessage;
    inputField.value = "";

    // Show loading message
    let loadingMessage = `<p class="bot-message">🎨 Generating image...</p>`;
    chatBox.innerHTML += loadingMessage;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request to AI API
    let response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
    });

    let data = await response.json();
    let imageUrl = data.image_url;

    // Remove loading message & show generated image
    chatBox.innerHTML = chatBox.innerHTML.replace(loadingMessage, '');
    chatBox.innerHTML += `<img src="${imageUrl}" class="generated-image" />`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
