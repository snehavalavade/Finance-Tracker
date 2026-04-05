"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "./mockdata";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState(mockTransactions);

    useEffect(() => {
        const saved = localStorage.getItem("transactions");
        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    function addTransaction(tx) {
        const newTx = {
            ...tx,
            id: Date.now(),
            amount: parseFloat(tx.amount),
        };
        setTransactions((prev) => [newTx, ...prev]);
    }

    function deleteTransaction(id) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }

    function resetTransactions() {
        localStorage.removeItem("transactions");
        setTransactions(mockTransactions);
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                resetTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}
