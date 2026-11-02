
const form = document.getElementById("form");
const list = document.getElementById("list");

// let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let transactions = [];
function update() {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    document.getElementById("income").textContent = income.toFixed(2);
    document.getElementById("expenses").textContent = expenses.toFixed(2);
    document.getElementById("balance").textContent = (income - expenses).toFixed(2);

    list.replaceChildren();

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.className = t.type;
        const text = document.createElement("span");
        const button = document.createElement("button");

        text.textContent = `${t.description} - ₹${t.amount.toFixed(2)}`;
        button.textContent = "Delete";
        button.className = "delete";

        // button.onclick = () => {
        //     transactions = transactions.filter(item => item.id !== t.id);
        //     save();
        // };
        button.onclick = () => deleteTransaction(t.id);

        li.append(text, button);
        list.append(li);
    });
}
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    update();
}
function save() {
    // localStorage.setItem("transactions", JSON.stringify(transactions));
    update();
}

form.onsubmit = event => {
    event.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid description and amount.");
        return;
    }

    transactions.push({
        id: Date.now() + Math.random(),
        description,
        amount,
        type
    });

    save();
    form.reset();
};

update();
