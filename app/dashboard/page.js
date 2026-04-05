"use client";
import { useState } from "react";
import { useTransactions } from "@/lib/TransactionContext";
import MainHeader from "@/components/layout/MainHeader";
import SummaryCard from "@/components/dashboard/SummaryCards";
import SpendingLineChart from "@/components/charts/SpendingLineChart";
import CategoryBarChart from "@/components/charts/CategoryBarChart";
import Insights from "@/components/dashboard/Insights";
import TxFilters from "@/components/transactions/TxFilters";
import TxList from "@/components/transactions/TxList";
import AddTransaction from "@/components/ui/AddTransaction";
import classes from "./dashboard.module.css";

export default function DashboardPage() {
    const { transactions } = useTransactions();
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const filtered = transactions
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .filter((t) =>
            activeFilter === "All" ? true : t.category === activeFilter,
        )
        .sort((a, b) => {
            if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
            if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
            if (sortBy === "highest") return b.amount - a.amount;
            if (sortBy === "lowest") return a.amount - b.amount;
        });

    return (
        <div className={classes.page}>
            <MainHeader />
            <main className={classes.main}>
                <SummaryCard transactions={transactions} />

                <div className={classes.charts}>
                    <SpendingLineChart transactions={transactions} />
                    <CategoryBarChart transactions={transactions} />
                </div>

                <Insights transactions={transactions} />

                <div className={classes.txSection}>
                    <div className={classes.txHeader}>
                        <p className={classes.txTitle}>Transactions</p>
                        <AddTransaction />
                    </div>
                    <TxFilters
                        search={search}
                        setSearch={setSearch}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <TxList transactions={filtered} />
                </div>
            </main>
        </div>
    );
}
