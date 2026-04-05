import "./globals.css";
import { RoleProvider } from "@/lib/RoleContext";
import { TransactionProvider } from "@/lib/TransactionContext";

export const metadata = {
    title: "SpendWise",
    description: "Finance Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <TransactionProvider>
                    <RoleProvider>{children}</RoleProvider>
                </TransactionProvider>
            </body>
        </html>
    );
}
