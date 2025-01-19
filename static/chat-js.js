document.addEventListener("DOMContentLoaded", () => {
  // Get the current user's name from the <h1> tag
  const currentUserName = document.querySelector("h1").textContent.trim();

  // Add a MutationObserver to monitor changes in the #conversation container
  const conversationContainer = document.querySelector("#conversation");

  const updateMessages = () => {
    // Select all messages in the chat container
    const messages = conversationContainer.querySelectorAll(".message");

    messages.forEach((message) => {
      // Get the sender name from the message
      const senderName = message.querySelector(".sender").textContent.trim();

      // Update the message if the sender matches the current user
      if (senderName === currentUserName) {
        // Update the sender name to "You"
        const senderDiv = message.querySelector(".sender");
        senderDiv.textContent = "You";

        // Update the parent div's class and data attribute
        message.classList.remove("other");
        message.classList.add("user");
        message.setAttribute("data-sender", "current");
      }
    });
  };

  // Update messages initially in case some are already loaded
  updateMessages();

  // Observe future changes and reapply updates
  const observer = new MutationObserver(() => {
    updateMessages();
  });

  observer.observe(conversationContainer, {
    childList: true,
    subtree: true,
  });
});

//? -------------> old implementation
// document.addEventListener("DOMContentLoaded", () => {
//   // Get the current user's name from the <h1> tag
//   const currentUserName = document.querySelector("h1").textContent.trim();

//   // Add a MutationObserver to monitor changes in the #conversation container
//   const conversationContainer = document.querySelector("#conversation");

//   const filterMessages = () => {
//     // Select all messages in the chat container
//     const messages = conversationContainer.querySelectorAll(".message");

//     messages.forEach((message) => {
//       // Get the sender name from the message
//       const senderName = message.querySelector(".sender").textContent.trim();

//       // Remove the message if the sender matches the current user
//       if (senderName === currentUserName) {
//         message.remove();
//       }
//     });
//   };

//   // Filter messages initially in case some are already loaded
//   filterMessages();

//   // Observe future changes and reapply filtering
//   const observer = new MutationObserver(() => {
//     filterMessages();
//   });

//   observer.observe(conversationContainer, {
//     childList: true,
//     subtree: true,
//   });
// });
