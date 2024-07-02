const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("Speech recognition started");
};

recognition.onresult = function (event) {
  const spokenWords = event.results[0][0].transcript.toLowerCase(); // convert to lowercase
  console.log("Spoken words are: ", spokenWords);
  computerSpeech(spokenWords);
};

function computerSpeech(words) {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = "en-in";
  speech.pitch = 0.9;
  speech.volume = 1;
  speech.rate = 1;
  determineWords(speech, words);
  window.speechSynthesis.speak(speech);
}

function determineWords(speech, words) {
  if (words.includes("who are you") || words.includes("what are you") || words.includes("introduce yourself") || words.includes("who is this") || words.includes("who is speaking")) {
    speech.text = "I am your virtual assistant.";
  } else if (words.includes("hello") || words.includes("hi") || words.includes("hey") || words.includes("good morning") || words.includes("good afternoon") || words.includes("good evening")) {
    speech.text = "Hello! How can I assist you?";
  } else if (words.includes("What your doing here") || words.includes("hi") || words.includes("Good Noon") || words.includes("good morning") || words.includes("good afternoon") || words.includes("good evening")) {
    speech.text = "Love to see you here";
  }else if (words.includes("how i can buy a book  table") || words.includes("book me a table") || words.includes("hey") || words.includes("good morning") || words.includes("good afternoon") || words.includes("good evening")) {
    speech.text = "you go with my website";
  }
   else if (words.includes("how does this site work") || words.includes("how does your website function") || words.includes("explain your website") || words.includes("how do I use this site") || words.includes("how to use this website")) {
    speech.text = "Our website allows you to browse restaurants, view availability, and reserve tables seamlessly.";
  } else if (words.includes("what restaurants do you have") || words.includes("show me restaurants") || words.includes("list of restaurants") || words.includes("browse eateries") || words.includes("find dining options") || words.includes("available restaurants")) {
    speech.text = "We feature a variety of restaurants offering different cuisines. You can explore them by browsing or searching.";
  } else if (words.includes("how do i make a reservation") || words.includes("how to book a table") || words.includes("reserve a table") || words.includes("schedule a booking") || words.includes("secure a table") || words.includes("book a table")) {
    speech.text = "You can make a reservation by selecting a restaurant, choosing your preferred date and time, and completing the booking process.";
  } else if (words.includes("are there any discounts or offers") || words.includes("current promotions") || words.includes("special deals") || words.includes("discounts available") || words.includes("any offers today") || words.includes("promotions available")) {
    speech.text = "We often have special offers and discounts available. Check the restaurant's page or our promotions section for current deals.";
  } else if (words.includes("can i cancel my reservation") || words.includes("how to cancel booking") || words.includes("cancel my table reservation") || words.includes("change my booking") || words.includes("modify my reservation") || words.includes("cancel reservation")) {
    speech.text = "Yes, you can cancel your reservation. Please check the cancellation policy on the restaurant's page for details.";
  } else if (words.includes("what payment methods do you accept") || words.includes("how can i pay") || words.includes("accepted payment options") || words.includes("credit cards accepted") || words.includes("payment options available") || words.includes("how to pay")) {
    speech.text = "Right now we only have UPI payment, scan the code to confirm your reservation.";
  } else if (words.includes("is there parking available at the restaurants") || words.includes("parking options") || words.includes("where can i park") || words.includes("availability of parking") || words.includes("parking facilities") || words.includes("parking available")) {
    speech.text = "Parking availability varies by restaurant. Please check the restaurant's amenities section for parking details.";
  } else if (words.includes("can i see restaurant reviews") || words.includes("customer feedback") || words.includes("ratings and reviews") || words.includes("what others say") || words.includes("opinions from customers") || words.includes("restaurant ratings")) {
    speech.text = "Yes, you can view restaurant reviews and ratings from other customers on each restaurant's page.";
  } else if (words.includes("how can i contact") || words.includes("get help") || words.includes("customer service contact") || words.includes("need assistance") || words.includes("support team contact") || words.includes("contact support")) {
    speech.text = "You can contact our support team via email at support@example.com or by phone at +123456789.";
  } else if (words.includes("how do i change my reservation") || words.includes("modify my booking") || words.includes("update reservation details") || words.includes("change booking information") || words.includes("edit my reservation") || words.includes("change reservation")) {
    speech.text = "To change your reservation, please cancel your existing reservation and make a new one with your desired changes.";
  } else if (words.includes("do you offer private dining or special events") || words.includes("private parties") || words.includes("event hosting") || words.includes("special occasions") || words.includes("private event spaces") || words.includes("host events")) {
    speech.text = "Some restaurants offer private dining rooms or accommodate special events. You can check the restaurant's details or contact us for more information.";
  } else {
    speech.text = "I apologize, but I'm not sure how to help with that right now. Please try asking a different question or contact our support team for assistance.";
  }
}

function activateBot() {
  recognition.start();
  // Ensure the gif path is correct and the gif is properly updated
  document.getElementById("robotImage").src = "./images/robosgbit.gif";
}