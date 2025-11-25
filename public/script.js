// DOM Elements
const emojiInput = document.getElementById("emojiInput");
const firstEmojiInput = document.getElementById("firstEmoji");
const secondEmojiInput = document.getElementById("secondEmoji");
const dualEmojiInputs = document.getElementById("dualEmojiInputs");
const output = document.getElementById("output");
const styleSelectorBtn = document.getElementById("styleSelectorBtn");
const stylesContainer = document.getElementById("stylesContainer");
const styleTableBody = document.getElementById("styleTableBody");
const notification = document.getElementById("notification");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

let selectedStyle = null;

// Define all available styles
const styleOptions = [
    { 
        value: "⃝", 
        name: "Circle", 
        example: "👽⃝",
        description: "Encloses emoji in a circle",
        type: "single"
    },
    { 
        value: "⃞", 
        name: "Square", 
        example: "👽⃞",
        description: "Encloses emoji in a square",
        type: "single"
    },
    { 
        value: "⃤", 
        name: "Triangle", 
        example: "👽⃤",
        description: "Encloses emoji in a triangle",
        type: "single"
    },
    { 
        value: "⃟", 
        name: "Diamond", 
        example: "👽⃟",
        description: "Encloses emoji in a diamond",
        type: "single"
    },
    { 
        value: "⃠", 
        name: "Circle Slash", 
        example: "👽⃠",
        description: "Circle with diagonal slash",
        type: "single"
    },
    { 
        value: "⃣", 
        name: "Keycap", 
        example: "👽⃣",
        description: "Emoji as a keycap",
        type: "single"
    },
    { 
        value: "̇", 
        name: "Dot Above", 
        example: "👽̇",
        description: "Adds a dot above the emoji",
        type: "single"
    },
    { 
        value: "̣", 
        name: "Dot Below", 
        example: "👽̣",
        description: "Adds a dot below the emoji",
        type: "single"
    },
    { 
        value: "̈", 
        name: "Double Dots", 
        example: "👽̈",
        description: "Adds two dots above (umlaut)",
        type: "single"
    },
    { 
        value: "⃛", 
        name: "Triple Dots", 
        example: "👽⃛",
        description: "Adds three dots above",
        type: "single"
    },
    { 
        value: "⃜", 
        name: "Quad Dots", 
        example: "👽⃜",
        description: "Adds four dots above",
        type: "single"
    },
    { 
        value: "⃰", 
        name: "Asterisk", 
        example: "👽⃰",
        description: "Adds an asterisk overlay",
        type: "single"
    },
    { 
        value: "̸", 
        name: "Long Slash", 
        example: "👽̸",
        description: "Adds a long diagonal slash",
        type: "single"
    },
    { 
        value: "̷", 
        name: "Short Slash", 
        example: "👽̷",
        description: "Adds a short diagonal slash",
        type: "single"
    },
    { 
        value: "̲", 
        name: "Underline", 
        example: "👽̲",
        description: "Adds an underline",
        type: "single"
    },
    { 
        value: "⃒", 
        name: "Vertical Line", 
        example: "👽⃒",
        description: "Adds a vertical line overlay",
        type: "single"
    },
    { 
        value: "⃯", 
        name: "Down Arrow", 
        example: "👽⃯",
        description: "Adds a downward arrow",
        type: "single"
    },
    { 
        value: "⃮", 
        name: "Up Arrow", 
        example: "👽⃮",
        description: "Adds an upward arrow",
        type: "single"
    },
    { 
        value: "̊", 
        name: "Small Circle Above", 
        example: "👽̊",
        description: "Adds a small circle above",
        type: "single"
    },
    { 
        value: "̥", 
        name: "Small Circle Below", 
        example: "👽̥",
        description: "Adds a small circle below",
        type: "single"
    },
    { 
        value: "̼", 
        name: "Seagull Accent", 
        example: "👽̼",
        description: "Adds a seagull-like accent",
        type: "single"
    },
    { 
        value: "̰", 
        name: "Wave Overlay", 
        example: "👽̰",
        description: "Adds a wave-like overlay",
        type: "single"
    },
    { 
        value: "̴", 
        name: "Tilde Overlay", 
        example: "👽̴",
        description: "Adds a tilde overlay",
        type: "single"
    },
    { 
        value: "⃢⃢", 
        name: "Dual Emoji Connector", 
        example: "🗽⃢⃢🗿",
        description: "Connects two emojis with a special overlay",
        type: "dual"
    }
];

// Create style table
styleOptions.forEach(option => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="style-name">${option.name}</td>
        <td class="style-example">${option.example}</td>
        <td class="style-description">${option.description}</td>
    `;
    row.addEventListener("click", () => {
        selectedStyle = option;
        updatePreview();

        // Update active state
        document.querySelectorAll(".style-table tr").forEach(el => {
            el.classList.remove("active");
        });
        row.classList.add("active");

        // Show/hide dual emoji inputs
        if (option.type === "dual") {
            dualEmojiInputs.classList.add("show");
            emojiInput.style.display = "none";
            emojiInput.parentElement.querySelector("label").style.display = "none";
            emojiInput.parentElement.querySelector(".example").style.display = "none";
        } else {
            dualEmojiInputs.classList.remove("show");
            emojiInput.style.display = "block";
            emojiInput.parentElement.querySelector("label").style.display = "block";
            emojiInput.parentElement.querySelector(".example").style.display = "block";
        }

        // Close the styles container
        stylesContainer.classList.remove("show");

        // Add pulse animation to output
        output.classList.add("pulse");
        setTimeout(() => {
            output.classList.remove("pulse");
        }, 500);
    });
    styleTableBody.appendChild(row);
});

// Toggle styles container
styleSelectorBtn.addEventListener("click", () => {
    stylesContainer.classList.toggle("show");
});

// Live preview
function updatePreview() {
    let result = '';

    if (selectedStyle) {
        if (selectedStyle.type === "dual") {
            const firstEmoji = firstEmojiInput.value.trim();
            const secondEmoji = secondEmojiInput.value.trim();

            if (firstEmoji && secondEmoji) {
                result = firstEmoji + selectedStyle.value + secondEmoji;
            }
        } else {
            const emoji = emojiInput.value.trim();

            if (emoji) {
                result = emoji + selectedStyle.value;
            }
        }
    }

    if (result) {
        output.innerHTML = result;
        output.classList.remove("empty-output");
    } else {
        output.innerHTML = '<span class="empty-output">Your styled emoji will appear here</span>';
        output.classList.add("empty-output");
    }
}

// Event listeners for inputs
emojiInput.addEventListener("input", updatePreview);
firstEmojiInput.addEventListener("input", updatePreview);
secondEmojiInput.addEventListener("input", updatePreview);

// Copy to clipboard
copyBtn.addEventListener("click", () => {
    const text = output.textContent;
    if (!text || output.classList.contains("empty-output")) {
        showNotification("Please enter emoji(s) and select a style first!", "warning");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            showNotification("Copied: " + text, "success");
            // Add pulse animation to output
            output.classList.add("pulse");
            setTimeout(() => {
                output.classList.remove("pulse");
            }, 500);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
            showNotification("Failed to copy to clipboard", "warning");
        });
});

// Reset form
resetBtn.addEventListener("click", () => {
    emojiInput.value = "";
    firstEmojiInput.value = "";
    secondEmojiInput.value = "";
    selectedStyle = null;
    updatePreview();
    document.querySelectorAll(".style-table tr").forEach(el => {
        el.classList.remove("active");
    });
    stylesContainer.classList.remove("show");
    dualEmojiInputs.classList.remove("show");
    emojiInput.style.display = "block";
    emojiInput.parentElement.querySelector("label").style.display = "block";
    emojiInput.parentElement.querySelector(".example").style.display = "block";
    showNotification("Form reset", "success");
});

// Show notification
function showNotification(message, type = "success") {
    notification.textContent = message;
    notification.className = "notification";
    notification.classList.add(type, "show");

    // Update icon based on type
    const icon = notification.querySelector("svg");
    if (type === "success") {
        icon.innerHTML = '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>';
    } else {
        icon.innerHTML = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>';
    }

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Close styles container when clicking outside
document.addEventListener("click", (e) => {
    if (!stylesContainer.contains(e.target) && e.target !== styleSelectorBtn) {
        stylesContainer.classList.remove("show");
    }
});