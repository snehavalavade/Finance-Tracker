import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { getCategoryTotals } from "@/lib/utils";
import classes from "./CategoryBarChart.module.css";

export default function CategoryBarChart({ transactions }) {
    const data = getCategoryTotals(transactions);

    return (
        <div className={classes.card}>
            <p className={classes.title}>Spending by category</p>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} layout="vertical">
                    <XAxis
                        dataKey="month"
                        stroke="#555"
                        tick={{ fill: "#888", fontSize: 12 }}
                    />
                    <YAxis
                        stroke="#555"
                        tick={{ fill: "#888", fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "#1c1c1c",
                            border: "1px solid #2e2e2e",
                            borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#f0ede8" }}
                        itemStyle={{ color: "#888" }}
                    />
                    <Bar
                        dataKey="amount"
                        fill="#f0ede8"
                        radius={[0, 4, 4, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
