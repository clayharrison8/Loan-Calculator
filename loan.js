function calculate(loanAmount, annualInterestRate, loanPeriod, timePeriod){

clearTable();
showHide();

var totalRows = getRows(timePeriod, loanPeriod);
var interestRate = annualInterestRate / 100;
var paymentAmount = ((interestRate * loanAmount) / (1 - Math.pow((1 + interestRate), - totalRows)));

  for (i = 0; i < totalRows; i++) {

    var paymentNo = i + 1;
    var principalPayment = (paymentAmount * Math.pow((1 + interestRate), - (1 + totalRows - paymentNo)));
    var interestAmountPaid = (paymentAmount - principalPayment);
    var totalBalance = ((interestAmountPaid / interestRate) - principalPayment);

    if (totalBalance <= 0){
      totalBalance = 0.00;
    }

    addRow(paymentNo, formatter.format(paymentAmount), formatter.format(principalPayment), formatter.format(interestAmountPaid), formatter.format(totalBalance));

    } 

}

// Adding commas and rounding to make for better reading e.g. 15000.58395 to £15,000.58
var formatter = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
});

// Method for adding data to the table
function addRow(one, two, three, four, five){
  var table = document.getElementById("loanTable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3); 
  var cell5 = row.insertCell(4);

  cell1.innerHTML = one;
  cell2.innerHTML = two;
  cell3.innerHTML = three; 
  cell4.innerHTML = four; 
  cell5.innerHTML = five;
}

// Remove prexisting table that user created
function clearTable(){
  var table = document.getElementById("loanTable");

  if (table.rows.length > 1) {
    table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
}

}

// To calculate how many months user will have to pay back
function getRows(timePeriod, loanPeriod){
   if (timePeriod == "years") {
    return loanPeriod * 12;
  }
  else {
    return (loanPeriod * 12) / 12;
  }
}


// Toggling the form and table to only show one at any given time
function showHide(){

  var loanForm = document.getElementById("loanForm");
  loanForm.style.display == "none" ? loanForm.style.display = "block": loanForm.style.display = "none";


  var loanPayment = document.getElementById("loanPayment");
  loanPayment.style.visibility == "visible" ? loanPayment.style.visibility = "hidden": loanPayment.style.visibility = "visible";

}

// Checking inputs aren't blank, are numbers and within correct range
function validateForm(loanAmount, annualInterestRate, loanPeriod, timePeriod){

    if (loanAmount == ""){
      alert("Please enter loan amount");
    }
    else if (isNaN(loanAmount)){
      alert("Loan Amount: Please enter valid number");
    }
    
     else if (annualInterestRate == ""){
      alert("Please enter annual interest rate");
    }
    else if (isNaN(annualInterestRate)){
      alert("Annual Interest Rate: Please enter valid number");
    }

    else if (annualInterestRate < 0 || annualInterestRate > 100){
      alert("Annual Interest Rate must be between 0 and 100");
    }

     else if (loanPeriod == ""){
      alert("Please enter loan period");
    } 
    else if (isNaN(loanPeriod)){
      alert("Loan Period: Please enter valid number");
    }

     else if (loanPeriod % 1 != 0){
      alert("Please enter whole number");
    }

    else {
      calculate(loanAmount, annualInterestRate, loanPeriod, timePeriod);
    }


}