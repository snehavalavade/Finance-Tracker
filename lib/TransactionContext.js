"use client";
import { useContext, createContext, useState } from "react";
import { mockTransactions } from "./mockdata";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState(mockTransactions);
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
    return (
        <>
            <TransactionContext.Provider
                value={{ transactions, addTransaction, deleteTransaction }}
            >
                {children}
            </TransactionContext.Provider>
        </>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}
