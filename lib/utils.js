export function getLatestMonth(transactions) {
    const sorted = transactions
        .map((t) => t.date)
        .sort()
        .reverse();
    const latest = new Date(sorted[0]);
    return `${latest.getFullYear()}-${String(latest.getMonth() + 1).padStart(2, "0")}`;
}

export function getTotals(transactions) {
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        income,
        expenses,
        balance: income - expenses,
    };
}

export function getMonthlyData(transactions) {
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const monthKeys = [
        "2025-10",
        "2025-11",
        "2025-12",
        "2026-01",
        "2026-02",
        "2026-03",
    ];

    return monthKeys.map((key, i) => {
        const monthTx = transactions.filter((t) => t.date.startsWith(key));
        const expenses = monthTx
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const income = monthTx
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        return { month: months[i], expenses, income };
    });
}

export function getCategoryTotals(transactions) {
    const expenses = transactions.filter((t) => t.type === "expense");
    const totals = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    return Object.entries(totals)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount);
}

export function getInsights(transactions) {
    const currentMonth = getLatestMonth(transactions);

    const [year, month] = currentMonth.split("-").map(Number);
    const prevMonth =
        month === 1
            ? `${year - 1}-12`
            : `${year}-${String(month - 1).padStart(2, "0")}`;

    const thisMonthExpenses = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
        .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith(prevMonth))
        .reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals = getCategoryTotals(transactions);
    const topCategory = categoryTotals[0]?.category || "—";

    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyAverage = Math.round(thisMonthExpenses / daysInMonth);

    const percentChange =
        lastMonthExpenses > 0
            ? Math.round(
                  ((thisMonthExpenses - lastMonthExpenses) /
                      lastMonthExpenses) *
                      100,
              )
            : 0;

    return {
        topCategory,
        thisMonthExpenses,
        lastMonthExpenses,
        dailyAverage,
        percentChange,
    };
}
