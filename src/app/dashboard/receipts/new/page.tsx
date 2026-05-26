'use client';

import { useActionState, useState } from 'react';
import { createReceiptAction } from '@/app/actions/receipts';
import ReceiptView from '@/app/components/ReceiptView';

export default function NewReceiptPage() {
  const [state, formAction, isPending] = useActionState(createReceiptAction, null);
  
  // Real-time state syncing for live rendering updates
  const [formData, setFormData] = useState({
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    amount: 1500.00,
    payment_method: 'bank_transfer',
    purpose: 'Full Stack Web Platform Maintenance Deposit',
    transaction_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
      
      {/* Left Input Form Column */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Receipt Information</h1>
        
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Customer Name</label>
            <input 
              name="customer_name" 
              type="text" 
              required 
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Customer Email</label>
            <input 
              name="customer_email" 
              type="email" 
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Amount ($)</label>
              <input 
                name="amount" 
                type="number" 
                step="0.01" 
                required 
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Payment Method</label>
              <select 
                name="payment_method" 
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="pos">POS</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Purpose of Payment</label>
            <input 
              name="purpose" 
              type="text" 
              required 
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Transaction Date</label>
            <input 
              name="transaction_date" 
              type="date" 
              required 
              onChange={handleChange}
              defaultValue={formData.transaction_date}
              className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white"
            />
          </div>

          {state?.success && (
            <p className="text-xs text-green-500 bg-green-50 dark:bg-green-950/30 p-2.5 rounded-md">
              Transaction successfully recorded in database!
            </p>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm transition disabled:opacity-50"
          >
            {isPending ? 'Saving Record...' : 'Save & Lock Receipt'}
          </button>
        </form>
      </div>

      {/* Right Visual Output Live Preview Column */}
      <div className="flex flex-col justify-center bg-zinc-100/50 dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Live Canvas Engine Output</h3>
        <ReceiptView receiptData={formData} />
      </div>

    </div>
  );
}