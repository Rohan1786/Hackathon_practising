function handleUserMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user-message');
    document.getElementById('userInput').value = '';

    const botResponse = determineResponse(userInput);
    addMessage(botResponse, 'bot-message');
  }

  function addMessage(message, className) {
    const messageContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  function determineResponse(words) {
    let response = '';

    if (words.includes("who are you") || words.includes("what are you") || words.includes("introduce yourself")) {
      response = "I am your virtual assistant.";
    } else if (words.includes("hello") || words.includes("hi") || words.includes("hey") || words.includes("good morning") || words.includes("good afternoon")) {
      response = "Hello! How can I assist you?";
    } else if (words.includes("how does this site work") || words.includes("how does your website function") || words.includes("explain your website")) {
      response = "Our website allows you to browse restaurants, view availability, and reserve tables seamlessly.";
    } else if (words.includes("what restaurants do you have") || words.includes("show me restaurants") || words.includes("list of restaurants") || words.includes("browse eateries") || words.includes("find dining options")) {
      response = "We feature a variety of restaurants offering different cuisines. You can explore them by browsing or searching.";
    } else if (words.includes("how do I make a reservation") || words.includes("book a table") || words.includes("reserve a table") || words.includes("schedule a booking") || words.includes("secure a table")) {
      response = "You can make a reservation by selecting a restaurant, choosing your preferred date and time, and completing the booking process.";
    } else if (words.includes("are there any discounts or offers") || words.includes("current promotions") || words.includes("special deals") || words.includes("discounts available") || words.includes("any offers today")) {
      response = "We often have special offers and discounts available. Check the restaurant's page or our promotions section for current deals.";
    } else if (words.includes("can I cancel my reservation") || words.includes("how to cancel booking") || words.includes("cancel my table reservation") || words.includes("change my booking") || words.includes("modify my reservation")) {
      response = "Yes, you can cancel your reservation. Please check the cancellation policy on the restaurant's page for details.";
    } else if (words.includes("what payment methods do you accept") || words.includes("how can I pay") || words.includes("accepted payment options") || words.includes("credit cards accepted") || words.includes("payment options available")) {
      response = "We accept major credit cards, debit cards, and sometimes other forms of digital payment. Payment options are displayed during checkout.";
    } else if (words.includes("is there parking available at the restaurants") || words.includes("parking options") || words.includes("where can I park") || words.includes("availability of parking") || words.includes("parking facilities")) {
      response = "Parking availability varies by restaurant. Please check the restaurant's amenities section for parking details.";
    } else if (words.includes("can I see restaurant reviews") || words.includes("customer feedback") || words.includes("ratings and reviews") || words.includes("what others say") || words.includes("opinions from customers")) {
      response = "Yes, you can view restaurant reviews and ratings from other customers on each restaurant's page.";
    } else if (words.includes("how can I contact support") || words.includes("get help") || words.includes("customer service contact") || words.includes("need assistance") || words.includes("support team contact")) {
      response = "You can contact our support team via email at support@example.com or by phone at +123456789.";
    } else if (words.includes("how do I change my reservation") || words.includes("modify my booking") || words.includes("update reservation details") || words.includes("change booking information") || words.includes("edit my reservation")) {
      response = "To change your reservation, please cancel your existing reservation and make a new one with your desired changes.";
    } else if (words.includes("do you offer private dining or special events") || words.includes("private parties") || words.includes("event hosting") || words.includes("special occasions") || words.includes("private event spaces")) {
      response = "Some restaurants offer private dining rooms or accommodate special events. You can check the restaurant's details or contact us for more information.";
    } else {
      response = "I apologize, but I'm not sure how to help with that right now. Please try asking a different question or contact our support team for assistance.";
    }

    return response;