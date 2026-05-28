// src/app/dashboard/receipts/page.tsx
import { getUserReceipts } from '@/app/actions/fetch-receipts';
import Link from 'next/link';

export const revalidate = 0; // Disable caching to always show live records upon navigation

export default async function ReceiptsHistoryPage() {
  const { receipts, error } = await getUserReceipts();

  return (
    <div className="space-y-6">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Receipt Archives</h1>
          <p className="text-sm text-zinc-500">Track, manage, and review all historically generated customer invoices</p>
        </div>
        <Link 
          href="/dashboard/receipts/new"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded-xl transition shadow-sm w-full sm:w-auto text-center"
        >
          + New Receipt
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Main Container Wrapper */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        {receipts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-zinc-400 text-sm mb-3">No transactions recorded in your profile yet.</p>
            <Link href="/dashboard/receipts/new" className="text-blue-500 hover:underline text-sm font-medium">
              Generate your first transaction voucher →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            
            {/* Desktop Table - Hidden on small screens, shown from tablet up */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm text-zinc-700 dark:text-zinc-300">
                {receipts.map((rec) => (
                  <tr key={rec.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition">
                    <td className="p-4 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      REC-{String(rec.receipt_number).padStart(5, '0')}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{rec.customer_name}</div>
                      {rec.customer_email && <div className="text-xs text-zinc-400">{rec.customer_email}</div>}
                    </td>
                    <td className="p-4 max-w-xs truncate">{rec.purpose}</td>
                    <td className="p-4 uppercase text-xs tracking-wider font-medium">{rec.payment_method.replace('_', ' ')}</td>
                    <td className="p-4 text-zinc-500 text-xs">{rec.transaction_date}</td>
                    <td className="p-4 text-right font-black text-zinc-900 dark:text-zinc-100">
                      ${Number(rec.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards Stack View - Hidden on Desktop, shown on Mobile Phone Displays */}
            <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
              {receipts.map((rec) => (
                <div key={rec.id} className="p-4 space-y-2.5 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      REC-{String(rec.receipt_number).padStart(5, '0')}
                    </span>
                    <span className="text-xs text-zinc-400">{rec.transaction_date}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{rec.customer_name}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{rec.purpose}</p>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded uppercase font-medium">
                      {rec.payment_method.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">
                      ${Number(rec.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

    </div>
  );
}