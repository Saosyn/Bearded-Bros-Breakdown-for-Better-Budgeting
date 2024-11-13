let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let assets = JSON.parse(localStorage.getItem("assets")) || [];

const incomeamount = parseFloat(document.getElementById("incomeAmount").value);

const incomedes = document.getElementById("incomeDescription").value;

const incomecat = document.getElementById("incomeCategory").value;
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

function addAsset() {
  const asset = { incomeAmount, incomedes, incomecat, date };
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
  });
}

function updateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  document.getElementById("totalExpenses").innerText = total.toFixed(2);
}

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
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      }, ],
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
    td = tr[i].getElementsByTagName("td")[2]; //Change [2] to search other categories
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

document.addEventListener("DOMContentLoaded", () => {
  updateChart();
  updateExpenseTable();
  updateTotalExpenses();
});

window.addEventListener('resize', function(event) {
    updateChart();
}, true);