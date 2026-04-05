"use client";
import classes from "./TxFilters.module.css";

const categories = [
    "All",
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Income",
    "Other",
];

export default function TxFilters({
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
}) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.pills}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${classes.pill} ${activeFilter === cat ? classes.pillActive : ""}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={classes.controls}>
                <input
                    className={classes.search}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search transactions..."
                />
                <select
                    className={classes.sort}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="highest">Highest amount</option>
                    <option value="lowest">Lowest amount</option>
                </select>
            </div>
        </div>
    );
}
