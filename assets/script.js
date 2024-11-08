let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const description = document.getElementById("expenseDescription").value;
  const category = document.getElementById("expenseCategory").value;
  const date = new Date().toLocaleDateString();

  if (!amount || !description) return alert("Please fill in all fields.");

  const expense = { amount, description, category, date };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";

  updateExpenseTable();
  updateTotalExpenses();
  updateChart();
}

function updateExpenseTable() {
  const tbody = document.getElementById("expenseTableBody");
  tbody.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${expense.date}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
        `;
    tbody.appendChild(row);
  });
}

function updateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  document.getElementById("totalExpenses").innerText = total.toFixed(2);
}

function updateChart() {
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (window.expenseChart) window.expenseChart.destroy;

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
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateExpenseTable();
  updateTotalExpenses();
});
  updateChart();
