// Select the display
const display = document.getElementById("display");

// Select all buttons
const buttons = document.querySelectorAll("button");

// Store operators
const operators = ["+", "-", "*", "/"];

// Function to handle all calculator input
function handleInput(value) {
  const lastChar = display.value.slice(-1);

  // AC
  if (value === "AC") {
    display.value = "";
    return;
  }

  // DEL
  if (value === "DEL") {
    display.value = display.value.slice(0, -1);
    return;
  }

  // =
  if (value === "=") {
    if (display.value === "" || operators.includes(lastChar)) {
      return;
    }

    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }

    return;
  }

  // Operators
  if (operators.includes(value)) {
    // Prevent + * / at beginning
    if (display.value === "" && value !== "-") {
      return;
    }

    // Replace last operator
    if (operators.includes(lastChar)) {
      display.value = display.value.slice(0, -1) + value;
    } else {
      display.value += value;
    }

    return;
  }

  // Decimal point
  if (value === ".") {
    const parts = display.value.split(/[+\-*/]/);

    const currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }

    display.value += ".";

    return;
  }

  // Numbers
  display.value += value;
}

// Mouse clicks
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleInput(button.textContent);
  });
});

// Keyboard support
document.addEventListener("keydown", function (event) {
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
  ];

  if (validKeys.includes(event.key)) {
    handleInput(event.key);
  } else if (event.key === "Enter") {
    event.preventDefault();

    handleInput("=");
  } else if (event.key === "Backspace") {
    event.preventDefault();

    handleInput("DEL");
  } else if (event.key === "Escape") {
    handleInput("AC");
  }
});
