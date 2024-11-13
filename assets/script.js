let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let assets = JSON.parse(localStorage.getItem("assets")) || [];

const incomeAmount = parseFloat(document.getElementById("incomeAmount").value);

const incomeDes = document.getElementById("incomeDescription").value;

const incomeCat = document.getElementById("incomeCategory").value;
const tbody = document.getElementById("expenseTableBody");
const date = new Date().toLocaleDateString();

// Update localStorage
function addExpense() {
  // if (!amount || !description) return alert("Please fill in all fields.");
  const description = document.getElementById("expenseDescription").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const expense = { amount, description, category, date };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";

  updateExpenseTable();
  updateTotalExpenses();
  updateChart();
}

function addIncome() {
  // if (!amount || !description) return alert("Please fill in all fields.");
  const description = document.getElementById("incomeDescription").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  const category = document.getElementById("incomeCategory").value;
  const income = { amount, description, category, date };
  incomes.push(income);
  localStorage.setItem("incomes", JSON.stringify(incomes));

  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";

  updateExpenseTable();
  updateTotalExpenses();
  updateChart();
}

function addAsset() {
  const asset = { incomeAmount, incomeDes, incomeCat, date };
  assets.push(asset);
  localStorage.setItem("assets", JSON.stringify(assets));
}

function updateExpenseTable() {
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

    income.forEach((income) => {
      const row = document.createElement("tr");

      row.innerHTML = `
              <td>${income.date}</td>
              <td>$${income.amount.toFixed(2)}</td>
              <td>${income.description}</td>
              <td>${income.category}</td>
          `;
      tbody.appendChild(row);
    });
  });
}

function updateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  document.getElementById("totalExpenses").innerText = total.toFixed(2);
}

function updateTotalExpenses() {
  const total = income.reduce((sum, income) => sum + income.amount, 0);
  document.getElementById("totalExpenses").innerText = total.toFixed(2);
}
// need to add in a function to add income into the table

function updateChart() {
  if (window.expenseChart) window.expenseChart.destroy;
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
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
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateChart();
  updateExpenseTable();
  updateTotalExpenses();
});
