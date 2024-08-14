let totalSaved = 0;

document.getElementById('savingsForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let initialAmountInput = document.getElementById('initialAmount');
  let initialAmount = parseFloat(initialAmountInput.value);
  if (isNaN(initialAmount) || initialAmount <= 0) {
    alert('Please enter a valid positive number.');
    initialAmountInput.value = '';
    initialAmountInput.focus();
    return;
  }

  startSaving(initialAmount);
  document.getElementById('resetButton').style.display = 'block';
  document.getElementById('projectionButton').style.display = 'block';
});

function startSaving(initialAmount) {
  const savingsDisplay = document.getElementById('savingsDisplay');
  savingsDisplay.innerHTML = ''; // Clear previous display

  const startDate = new Date();
  let currentAmount = initialAmount;

  // Calculate the number of days since the start date
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const daysPassed = Math.round(Math.abs((currentDate - startDate) / oneDay)) + 1;

  for (let day = 1; day <= daysPassed; day++) {
    totalSaved += currentAmount;
    const savedOnDay = document.createElement('p');
    savedOnDay.textContent = `Day ${day}: $${currentAmount.toFixed(2)} saved | Total: $${totalSaved.toFixed(2)}`;
    savingsDisplay.appendChild(savedOnDay);
    currentAmount++; // Increment amount for the next day
  }

  const totalSavedDisplay = document.createElement('p');
  totalSavedDisplay.textContent = `Total saved until ${currentDate.toDateString()}: $${totalSaved.toFixed(2)}`;
  savingsDisplay.appendChild(totalSavedDisplay);
}

document.getElementById('resetButton').addEventListener('click', function() {
  totalSaved = 0;
  document.getElementById('savingsDisplay').innerHTML = '';
  document.getElementById('initialAmount').value = '';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('projectionButton').style.display = 'none';
});

document.getElementById('projectionButton').addEventListener('click', function() {
  const projectionDisplay = document.createElement('div');
  projectionDisplay.innerHTML = '<h2>Savings Projection for the Year</h2>';
  projectionDisplay.innerHTML += '<p>Click again to close</p>';

  const projectionList = document.createElement('ul');
  let currentAmount = parseFloat(document.getElementById('initialAmount').value);

  // Calculate the number of days remaining in the current year
  const currentDate = new Date();
  const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const daysRemaining = Math.ceil((endOfYear - currentDate) / oneDay);

  // Ensure the projection covers exactly 365 days
  const projectionDays = Math.min(365, daysRemaining);

  for (let day = 1; day <= projectionDays; day++) {
    const listItem = document.createElement('li');
    listItem.textContent = `Day ${day}: $${currentAmount.toFixed(2)}`;
    projectionList.appendChild(listItem);
    currentAmount++; // Increment amount for the next day
  }

  projectionDisplay.appendChild(projectionList);
  document.body.appendChild(projectionDisplay);

  document.getElementById('projectionButton').style.display = 'none';
  projectionDisplay.addEventListener('click', function() {
    projectionDisplay.remove();
    document.getElementById('projectionButton').style.display = 'block';
  });
});
