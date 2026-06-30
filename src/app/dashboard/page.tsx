import Link from "next/link";
import Logo from "@/components/Logo";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
      <header className="flex h-[68px] flex-shrink-0 items-center border-b border-[#292929]/60 bg-[#0F0F0F] px-6">
        <Logo />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-[40px] font-bold tracking-tight">Dashboard</h1>
        <p className="text-[14px] text-[#8a8a8a]">You are signed in.</p>
        <Link
          href="/login"
          className="mt-4 rounded-[10px] bg-[#FFD900] px-6 py-3 text-[14px] font-semibold text-[#1a1a1a]"
        >
          Log out
        </Link>
      </main>
    </div>
  );
}
