const API_URL = "http://localhost:5000/api/expenses";
const token = localStorage.getItem("token");

let chart;

// Protect page
if (!token) {
  window.location.href = "login.html";
}

window.onload = fetchExpenses;

// FETCH EXPENSES
async function fetchExpenses() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const expenses = await res.json();
    document.getElementById("expenseList").innerHTML = "";

    let total = 0;
    const categoryTotals = {};

    expenses.forEach(exp => {
      addExpenseToUI(exp);
      total += exp.amount;

      categoryTotals[exp.category] =
        (categoryTotals[exp.category] || 0) + exp.amount;
    });

    document.getElementById("total").innerText = total;
    drawChart(categoryTotals);

  } catch (err) {
    console.error(err);
  }
}

// ADD EXPENSE
async function addExpense() {
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (!amount || !category) {
    alert("Amount and Category required");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ amount, category, description })
  });

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";

  fetchExpenses();
}

// ADD TO UI
function addExpenseToUI(exp) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>
      ₹${exp.amount}
      <span class="badge">${exp.category}</span>
    </span>
    <button class="delete-btn" onclick="deleteExpense('${exp._id}')">✖</button>
  `;
  document.getElementById("expenseList").appendChild(li);
}

// DELETE
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  fetchExpenses();
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// CHART
function drawChart(data) {
  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#2196F3",
          "#F44336",
          "#9C27B0",
          "#00BCD4"
        ]
      }]
    }
  });
}
