import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Prism | Backsplash Decision Strategy", description: "Working Prism Decision Engine prototype." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
