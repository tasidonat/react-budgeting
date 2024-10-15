// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Delete item
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);

    if(id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }

    return localStorage.removeItem(key);
};

// Create budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    };

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetsLength * 34} 65% 50%`;
};

export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Create Expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    };

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
};

// Total spent by budget
export const calculateSpentBudget = (budgetId) => {
    const expenses = fetchData('expenses') ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if(expense.budgetId !== budgetId) return acc;

        return acc += expense.amount;
    }, 0);

    return budgetSpent;
};

// Formatting
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
    });
};

export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDrigits: 0,
    });
};

export const formatDate = (epoch) => {
    return new Date(epoch).toLocaleDateString();
};

// Get all items
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];

    return data.filter((item) => item[key] === value);
};