// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="flex w-full max-w-4xl flex-col items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 p-8 md:p-12 bg-white dark:bg-zinc-950 shadow-sm sm:items-start gap-12">
        
        <div className="flex items-center justify-between w-full">
          {/* Removed the buggy <Image> to fix the "NEXT.js" display string artifact issue */}
          <span className="text-xl font-black text-blue-600">📄 RelayerReceipts</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            MVP v1.0
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Digital Payment Receipt Generator
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Simplify record keeping. Instantly process transactional logic, customize company information, layout digital assets, and download print-ready PDF configurations.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full sm:flex-row sm:w-auto">
          <Link
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 text-sm font-medium text-white transition-colors shadow-sm"
            href="/login"
          >
            Access Dashboard Account
          </Link>
        </div>
      </main>
    </div>
  );
}