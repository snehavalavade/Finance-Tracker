"use client";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { getMonthlyData } from "@/lib/utils";
import classes from "./SpendingLineChart.module.css";

export default function SpendingLineChart({ transactions }) {
    const data = getMonthlyData(transactions);
    return (
        <div className={classes.card}>
            <p className={classes.title}>Monthly trend</p>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data}>
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
                    <Legend />
                    <Line
                        dataKey="income"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        dataKey="expenses"
                        stroke="#f87171"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
