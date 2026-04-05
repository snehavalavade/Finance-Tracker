import TxCard from "./TxCard";
import classes from "./TxList.module.css";

export default function TxList({ transactions }) {
    if (transactions.length === 0) {
        return (
            <div className={classes.empty}>
                <p>No transactions found.</p>
            </div>
        );
    }

    return (
        <ul className={classes.list}>
            {transactions.map((tx) => (
                <li key={tx.id}>
                    <TxCard
                        id={tx.id}
                        title={tx.title}
                        amount={tx.amount}
                        category={tx.category}
                        type={tx.type}
                        date={tx.date}
                    />
                </li>
            ))}
        </ul>
    );
}
