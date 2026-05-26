// src/app/components/ReceiptView.tsx
'use client';

import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReceiptViewProps {
  receiptData: {
    customer_name: string;
    customer_email?: string | null;
    amount: number;
    payment_method: string;
    purpose: string;
    transaction_date: string;
    receipt_number?: number | string;
  };
}

export default function ReceiptView({ receiptData }: ReceiptViewProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    if (!element) return;
    setIsGenerating(true);

    try {
      // Force explicit configuration overrides to bypass Tailwind v4 OKLCH/LAB engine parsing crashes
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', 
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      const receiptId = receiptData.receipt_number || 'draft';
      pdf.save(`receipt-${receiptId}.pdf`);
    } catch (err) {
      console.error("PDF Engine crashed:", err);
      alert("Failed to render PDF. Please use the Print button alternative.");
    } finally {
      setIsGenerating(false);
    }
  };

  const displayId = receiptData.receipt_number 
    ? `REC-${String(receiptData.receipt_number).padStart(5, '0')}` 
    : `REC-DRAFT`;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-3 w-full max-w-md">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition shadow-sm disabled:opacity-50"
        >
          {isGenerating ? 'Rendering...' : 'Download PDF'}
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium py-2.5 px-4 rounded-xl text-sm transition border border-zinc-200 dark:border-zinc-700"
        >
          Print Receipt
        </button>
      </div>

      {/* Target Canvas forced to plain HEX values to avoid html2canvas engine failure */}
      <div 
        ref={receiptRef}
        className="w-full max-w-md text-black p-6 sm:p-8 rounded-xl border border-zinc-200 font-sans shadow-inner"
        style={{ backgroundColor: '#ffffff', color: '#000000' }}
      >
        <div className="text-center border-b border-gray-200 pb-4 mb-4" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-lg font-bold uppercase tracking-wider">YOUR COMPANY NAME LTD</h2>
          <p className="text-xs text-gray-500 mt-0.5">billing@company.com | +234 800 123 4567</p>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mb-6">
          <div>
            <p className="font-semibold uppercase text-gray-400 text-[10px]">Reference</p>
            <p className="text-sm font-bold text-black">{displayId}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold uppercase text-gray-400 text-[10px]">Date Issued</p>
            <p className="text-sm font-medium text-black">{receiptData.transaction_date}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 text-left">
          <div className="border-b border-gray-100 pb-1.5" style={{ borderColor: '#f3f4f6' }}>
            <span className="block text-[10px] font-semibold uppercase text-gray-400">Received From</span>
            <span className="text-sm font-medium text-black">{receiptData.customer_name || '---'}</span>
            {receiptData.customer_email && <span className="block text-xs text-gray-500">{receiptData.customer_email}</span>}
          </div>

          <div className="border-b border-gray-100 pb-1.5" style={{ borderColor: '#f3f4f6' }}>
            <span className="block text-[10px] font-semibold uppercase text-gray-400">Description</span>
            <span className="text-sm font-medium text-black">{receiptData.purpose || '---'}</span>
          </div>

          <div className="border-b border-gray-100 pb-1.5" style={{ borderColor: '#f3f4f6' }}>
            <span className="block text-[10px] font-semibold uppercase text-gray-400">Channel</span>
            <span className="text-sm font-medium text-black uppercase">{receiptData.payment_method}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg flex justify-between items-center border border-gray-100" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
          <span className="text-xs font-bold uppercase text-gray-500">Amount Paid</span>
          <span className="text-lg font-black text-black">${Number(receiptData.amount || 0).toFixed(2)}</span>
        </div>

        <div className="text-center mt-6 pt-4 border-t border-dashed border-gray-200" style={{ borderColor: '#e5e7eb' }}>
          <p className="text-[10px] text-gray-400 italic">Official transactional receipt affirmation voucher confirmation.</p>
        </div>
      </div>
    </div>
  );
}