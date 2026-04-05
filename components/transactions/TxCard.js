"use client";
import { useRole } from "@/lib/RoleContext";
import { useTransactions } from "@/lib/TransactionContext";
import classes from "./TxCard.module.css";

const categoryConfig = {
    Food: { icon: "🍔", bg: "#fff7ed" },
    Transport: { icon: "🚗", bg: "#eff6ff" },
    Bills: { icon: "💡", bg: "#f0fdf4" },
    Shopping: { icon: "🛍️", bg: "#fdf4ff" },
    Income: { icon: "💰", bg: "#f0fdf4" },
    Other: { icon: "📦", bg: "#f8fafc" },
};

export default function TxCard({ id, title, amount, category, type, date }) {
    const { role } = useRole();
    const { deleteTransaction } = useTransactions();

    const cat = categoryConfig[category] || categoryConfig.Other;
    const isIncome = type === "income";

    return (
        <div className={classes.card}>
            <div className={classes.icon} style={{ background: cat.bg }}>
                {cat.icon}
            </div>

            <div className={classes.info}>
                <p className={classes.title}>{title}</p>
                <p className={classes.meta}>
                    {category} · {date}
                </p>
            </div>

            <div className={classes.right}>
                <p
                    className={
                        isIncome ? classes.amountGreen : classes.amountRed
                    }
                >
                    {isIncome ? "+" : "-"}₹{Number(amount).toLocaleString()}
                </p>
                <span
                    className={
                        isIncome ? classes.badgeIncome : classes.badgeExpense
                    }
                >
                    {isIncome ? "Income" : "Expense"}
                </span>
                {role === "admin" && (
                    <button
                        className={classes.deleteBtn}
                        onClick={() => deleteTransaction(id)}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
