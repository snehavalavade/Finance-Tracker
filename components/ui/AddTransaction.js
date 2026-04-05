"use client";
import { useState } from "react";
import { useRole } from "@/lib/RoleContext";
import { useTransactions } from "@/lib/TransactionContext";
import classes from "./AddTransaction.module.css";

export default function AddTransaction() {
    const { role } = useRole();
    const { addTransaction } = useTransactions();

    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "Food",
        type: "expense",
        date: "",
    });

    if (role !== "admin") return null;

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.title || !form.amount || !form.date) {
            setError("Please fill all fields.");
            return;
        }

        addTransaction(form);
        setIsOpen(false);
        setError("");
        setForm({
            title: "",
            amount: "",
            category: "Food",
            type: "expense",
            date: "",
        });
    }

    return (
        <>
            <button className={classes.addBtn} onClick={() => setIsOpen(true)}>
                + Add Transaction
            </button>

            {isOpen && (
                <div
                    className={classes.overlay}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className={classes.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className={classes.modalHeader}>
                            <h3>Add Transaction</h3>
                            <p>Add a new income or expense</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className={classes.field}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Dinner at Meghana Foods"
                                />
                            </div>

                            <div className={classes.fieldRow}>
                                <div className={classes.field}>
                                    <label>Amount (₹)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div className={classes.field}>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className={classes.fieldRow}>
                                <div className={classes.field}>
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Food">Food</option>
                                        <option value="Transport">
                                            Transport
                                        </option>
                                        <option value="Bills">Bills</option>
                                        <option value="Shopping">
                                            Shopping
                                        </option>
                                        <option value="Income">Income</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className={classes.field}>
                                    <label>Type</label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                            </div>

                            {error && <p className={classes.error}>{error}</p>}

                            <div className={classes.actions}>
                                <button
                                    type="submit"
                                    className={classes.saveBtn}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className={classes.cancelBtn}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
