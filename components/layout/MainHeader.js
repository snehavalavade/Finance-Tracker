"use client";
import { useRole } from "@/lib/RoleContext";
import classes from "./MainHeader.module.css";

export default function MainHeader() {
    const { role, setRole } = useRole();

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <div className={classes.logoIcon}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    >
                        <path d="M12 2v20M2 12h20" />
                    </svg>
                </div>
                <span className={classes.logoText}>SpendWise</span>
            </div>
            <div className={classes.right}>
                {/* Role badge */}
                <span
                    className={
                        role === "admin"
                            ? classes.badgeAdmin
                            : classes.badgeViewer
                    }
                >
                    {role === "admin" ? "Admin" : "Viewer"}
                </span>
                <select
                    className={classes.roleSelect}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                </select>

                <span className={classes.greeting}>Hi, Sneha</span>
            </div>
        </header>
    );
}
