let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const tbody = document.getElementById("expenseTableBody");
const date = new Date().toLocaleDateString();

// Update localStorage for expenses
function addExpense() {
  const description = document.getElementById("expenseDescription").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const transaction = {
    amount: -amount,
    description,
    category,
    date,
    type: "Expense",
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";

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
    const amountText =
      transaction.amount >= 0
        ? `$${transaction.amount.toFixed(2)}`
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
  const total = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  document.getElementById("totalExpenses").innerText = total.toFixed(2);
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
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
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
