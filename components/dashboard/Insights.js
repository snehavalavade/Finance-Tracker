import { getInsights } from "@/lib/utils";
import classes from "./Insights.module.css";

export default function Insights({ transactions }) {
    const { topCategory, dailyAverage, percentChange, thisMonthExpenses } =
        getInsights(transactions);

    const isUp = percentChange > 0;

    return (
        <div className={classes.wrapper}>
            <p className={classes.sectionTitle}>Insights</p>
            <div className={classes.grid}>
                <div className={classes.card}>
                    <p className={classes.label}>Top category</p>
                    <p className={classes.value}>{topCategory}</p>
                    <p className={classes.sub}>
                        ₹{thisMonthExpenses.toLocaleString()} spent
                    </p>
                </div>

                <div className={classes.card}>
                    <p className={classes.label}>vs last month</p>
                    <p className={classes.value}>
                        {isUp ? "+" : ""}
                        {percentChange}%
                    </p>
                    <p className={isUp ? classes.subRed : classes.subGreen}>
                        {isUp ? "Spending increased" : "Spending decreased"}
                    </p>
                </div>

                <div className={classes.card}>
                    <p className={classes.label}>Daily average</p>
                    <p className={classes.value}>
                        ₹{dailyAverage.toLocaleString()}
                    </p>
                    <p className={classes.sub}>This month</p>
                </div>
            </div>
        </div>
    );
}
