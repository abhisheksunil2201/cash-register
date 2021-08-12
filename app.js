const cashField = document.querySelector(".cash");
const cashInput = document.querySelector(".cash-input");
const nextBtn = document.querySelector(".next");
const btn = document.querySelector(".btn");
const finalWarning = document.querySelector(".warning");
const displayResult = document.querySelector(".result");
const twoThousand = document.querySelector(".two-thousand");
const fiveHundred = document.querySelector(".five-hundred");
const hundred = document.querySelector(".hundred");
const twenty = document.querySelector(".twenty");
const ten = document.querySelector(".ten");
const five = document.querySelector(".five");
const one = document.querySelector(".one");
const notesTable = document.querySelector(".balance");
const billInput = document.querySelector(".bill-input");
const billWarning = document.querySelector(".bill-warning");

let notes = {
  2000: 0,
  500: 0,
  100: 0,
  20: 0,
  10: 0,
  5: 0,
  1: 0,
};

nextBtn.addEventListener("click", showBillField);
btn.addEventListener("click", calculateAmount);

function showBillField() {
  let billAmt = Math.ceil(+billInput.value);
  if (billAmt > 0) {
    cashField.classList.remove("hidden");
    btn.classList.remove("hidden");
    billWarning.innerText = "";
  } else {
    billWarning.innerText = "Please enter a valid bill amount.";
  }
}

function calculateAmount() {
  let billAmount = Math.ceil(+billInput.value);
  let cashAmount = +cashInput.value;
  if (cashAmount != (cashAmount | 0)) {
    finalWarning.innerText = "Please enter valid cash amount in whole number.";
    notesTable.classList.add("hidden");
  } else if (billAmount < 1 && cashAmount < 1) {
    finalWarning.innerText = "Please enter valid bill amount and cash amount.";
    notesTable.classList.add("hidden");
  } else if (billAmount < 1) {
    finalWarning.innerText = "Please enter a valid bill amount.";
    notesTable.classList.add("hidden");
  } else if (cashAmount < 1) {
    finalWarning.innerText = "Please enter a valid cash amount.";
    notesTable.classList.add("hidden");
  } else if (cashAmount < billAmount) {
    finalWarning.innerText = "Cash Amount should be more than Bill Amount. ";
    notesTable.classList.add("hidden");
  } else if (cashAmount === billAmount) {
    finalWarning.innerText = "No amount to return";
    notesTable.classList.add("hidden");
  } else {
    setNotes();
    finalWarning.innerText = "";
    const remainingAmount = cashAmount - billAmount;
    countNotes(remainingAmount);
    printNotes();
  }
}

function setNotes() {
  for (let key in notes) {
    notes[key] = 0;
  }
}

function countNotes(remainingAmount) {
  while (remainingAmount > 0) {
    if (remainingAmount >= 2000) {
      notes[2000] = (remainingAmount / 2000) | 0;
      remainingAmount = remainingAmount % 2000;
    } else if (remainingAmount >= 500) {
      notes[500] = (remainingAmount / 500) | 0;
      remainingAmount = remainingAmount % 500;
    } else if (remainingAmount >= 100) {
      notes[100] = (remainingAmount / 100) | 0;
      remainingAmount = remainingAmount % 100;
    } else if (remainingAmount >= 20) {
      notes[20] = (remainingAmount / 20) | 0;
      remainingAmount = remainingAmount % 20;
    } else if (remainingAmount >= 10) {
      notes[10] = (remainingAmount / 10) | 0;
      remainingAmount = remainingAmount % 10;
    } else if (remainingAmount >= 5) {
      notes[5] = (remainingAmount / 5) | 0;
      remainingAmount = remainingAmount % 5;
    } else {
      notes[1] = remainingAmount;
      remainingAmount = 0;
    }
  }
}

function printNotes() {
  notesTable.classList.remove("hidden");
  notes[2000]
    ? (twoThousand.innerText = notes[2000])
    : (twoThousand.innerText = "");

  notes[500]
    ? (fiveHundred.innerText = notes[500])
    : (fiveHundred.innerText = "");

  notes[100] ? (hundred.innerText = notes[100]) : (hundred.innerText = "");

  notes[20] ? (twenty.innerText = notes[20]) : (twenty.innerText = "");

  notes[10] ? (ten.innerText = notes[10]) : (ten.innerText = "");

  notes[5] ? (five.innerText = notes[5]) : (five.innerText = "");

  notes[1] ? (one.innerText = notes[1]) : (one.innerText = "");
}
