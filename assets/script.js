let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const tbody = document.getElementById("expenseTableBody");
const date = new Date().toLocaleDateString();

// Update localStorage for expenses
function addExpense() {
  const description = document.getElementById("expenseDescription").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  var expform = document.getElementById("expense");
  const transaction = {
    amount: -amount,
    description,
    category,
    date,
    type: "Expense",
  };

  // Validate that all form fields are completed
  for (var i = 0; i < expform.elements.length; i++) {
    if (
      expform.elements[i].value === "" &&
      expform.elements[i].hasAttribute("required")
    ) {
      alert("There are some required fields!");
      return false;
    }
  }
  // If all fields present:
  // Log to localStorage"
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // Reset values
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";

  // Reset tables, charts:
  updateTable();
  updateTotal();
  updateChart();
}

// Update localStorage for income
function addIncome() {
  const description = document.getElementById("incomeDescription").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  const category = document.getElementById("incomeCategory").value;
  const transaction = { amount, description, category, date, type: "Income" };
  var incform = document.getElementById("income");

  // Validate that all form fields are completed
  for (var i = 0; i < incform.elements.length; i++) {
    if (
      incform.elements[i].value === "" &&
      incform.elements[i].hasAttribute("required")
    ) {
      alert("There are some required fields!");
      return false;
    }
  }
  // If all fields present:
  // Log to localStorage"
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("incomeAmount").value = "";
  document.getElementById("incomeDescription").value = "";

  updateTable();
  updateTotal();
  updateChart();
}

// Update table with income and expenses
function updateTable() {
  tbody.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    // row.classList.add(expense.category); // Add category as class name to table row
    row.setAttribute("data-category", transaction.category);

    const amountText =
      transaction.amount >= 0
        ? `$${transaction.amount}`
        : `-$${Math.abs(transaction.amount).toFixed(2)}`;

    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${amountText}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>${transaction.type}</td>
    `;
    tbody.appendChild(row);
  });
}

// Calculate total balance
function updateTotal() {
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalNet = totalIncome - totalExpenses;

  document.getElementById("totalExpenses").innerText = totalExpenses.toFixed(2);
  document.getElementById("totalIncome").innerText = totalIncome.toFixed(2);
  document.getElementById("net").innerText = totalNet.toFixed(2);
}
// Update the pie chart
function updateChart() {
  // JS - Destroy exiting Chart Instance to reuse <canvas> element
  let chartStatus = Chart.getChart("expenseChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  //-- End of chart destroy

  const categoryTotals = transactions.reduce((totals, transaction) => {
    totals[transaction.category] =
      (totals[transaction.category] || 0) + Math.abs(transaction.amount);
    return totals;
  }, {});

  const ctx = document.getElementById("expenseChart").getContext("2d");

  window.expenseChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            // Salary
            "#9ee73e",
            // Going-Out
            "#66cccc",
            // House
            "#ff9999",
            // Car
            "#cc99ff",
            // Grocery
            "#99ccff",
            // Subscription
            "#ffcc99",
            // Other
            "#9966FF",
            // Zelle
            "#9ee73e",
            // Cash
            "#9ee73e",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
    },
  });
}

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("expenseInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("expenseTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
// Use ESC to exit modal: 
const modal = document.getElementById('modal')

window.addEventListener('popstate', () => {
  const target = window.location.hash
  
  if (target === '#modal') {
    modal.focus();
    modal.setAttribute('aria-hidden', false);
    return
  }
  
  modal.setAttribute('aria-hidden', true)
});

window.addEventListener('keydown', (e) => {
  if (e.key == "Escape" && window.location.hash === '#modal') {
    window.location.hash = ""
  }
})


document.addEventListener("DOMContentLoaded", () => {
  updateChart();
  updateTable();
  updateTotal();
});

window.addEventListener(
  "resize",
  function (event) {
    updateChart();
  },
  true
);
