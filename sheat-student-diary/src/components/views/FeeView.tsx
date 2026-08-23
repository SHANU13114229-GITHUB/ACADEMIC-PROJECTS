import React, { useState } from 'react';
import { FeeReceipt } from '../../types';
import { sampleFeeReceipts } from '../../mockData';
import { ArrowLeft, CreditCard, Download, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface FeeViewProps {
  onBack: () => void;
}

export const FeeView: React.FC<FeeViewProps> = ({ onBack }) => {
  const [receipts, setReceipts] = useState<FeeReceipt[]>(sampleFeeReceipts);
  const [payingId, setPayingId] = useState<string | null>(null);

  const handlePay = (id: string) => {
    setPayingId(id);
    setTimeout(() => {
      setReceipts((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: 'Paid' as const, mode: 'UPI / NetBanking', receiptNo: `SHEAT/2026/REC-ONLINE-${Math.floor(Math.random() * 90000 + 10000)}` }
            : r
        )
      );
      setPayingId(null);
    }, 1500);
  };

  const totalPaid = receipts
    .filter((r) => r.status === 'Paid')
    .reduce((acc, r) => acc + r.amount, 0);

  const totalPending = receipts
    .filter((r) => r.status === 'Pending')
    .reduce((acc, r) => acc + r.amount, 0);

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Fee Receipts & Dues</h2>
        </div>
        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full">
          2026-2027
        </span>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-500 text-white p-3.5 rounded-2xl shadow-xs border border-emerald-600">
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">Total Paid Fees</span>
          <p className="text-xl font-black mt-0.5">₹{totalPaid.toLocaleString()}</p>
        </div>

        <div className="bg-amber-500 text-white p-3.5 rounded-2xl shadow-xs border border-amber-600">
          <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">Outstanding Dues</span>
          <p className="text-xl font-black mt-0.5">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Receipt List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Fee History & Invoices</h3>

        {receipts.map((rec) => (
          <div
            key={rec.id}
            className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">{rec.receiptNo}</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                  rec.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {rec.status}
              </span>
            </div>

            <h4 className="text-sm font-bold text-gray-900 leading-snug">{rec.description}</h4>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <div>
                <p className="text-base font-black text-purple-900">₹{rec.amount.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">{rec.date} • {rec.mode}</p>
              </div>

              {rec.status === 'Pending' ? (
                <button
                  onClick={() => handlePay(rec.id)}
                  disabled={payingId === rec.id}
                  className="bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  {payingId === rec.id ? 'Processing...' : 'Pay Online Now →'}
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Receipt Downloaded
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
