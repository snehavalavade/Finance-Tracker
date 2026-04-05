import { getTotals, getLatestMonth } from "@/lib/utils";
import classes from "./SummaryCards.module.css";

export default function SummaryCards({ transactions }) {
    const { income, expenses, balance } = getTotals(transactions);

    const currentMonth = getLatestMonth(transactions);

    const thisMonth = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className={classes.grid}>
            <div className={classes.card}>
                <p className={classes.label}>Total balance</p>
                <p className={classes.value}>₹{balance.toLocaleString()}</p>
            </div>
            <div className={classes.card}>
                <p className={classes.label}>Total income</p>
                <p className={`${classes.value} ${classes.green}`}>
                    ₹{income.toLocaleString()}
                </p>
            </div>
            <div className={classes.card}>
                <p className={classes.label}>Total expenses</p>
                <p className={`${classes.value} ${classes.red}`}>
                    ₹{expenses.toLocaleString()}
                </p>
            </div>
            <div className={classes.card}>
                <p className={classes.label}>This month</p>
                <p className={`${classes.value} ${classes.red}`}>
                    ₹{thisMonth.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
