import { Banknote, CreditCard, ShieldCheck } from 'lucide-react';

export const PaymentMethodTab = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-2 text-white">
          <CreditCard className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-serif">Acquisition Payment Protocols</h2>
        </div>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Review active transaction channels and client payment credentials.
        </p>
      </div>

      <div className="space-y-4">
        {/* Active: Cash on Delivery */}
        <div className="p-5 rounded-2xl border border-neutral-700 bg-neutral-900/90 text-white space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-serif font-semibold text-white">Cash on Delivery (COD)</p>
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-emerald-950/60 border border-emerald-900 text-emerald-400 font-medium">
                    Active Primary
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-light mt-0.5 leading-relaxed">
                  Direct physical settlement upon courier doorstep handover. Available on all atelier orders.
                </p>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full border border-emerald-400 bg-emerald-400 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* Coming Soon: Encrypted Card Terminal */}
        <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 text-neutral-400 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-serif text-white">Encrypted Card Terminal (Stripe)</p>
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-neutral-800 text-neutral-400 font-medium">
                    Upcoming Release
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-light mt-0.5">
                  Visa, MasterCard, and American Express tokenized checkout will be activated shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl flex items-center space-x-3 text-xs text-neutral-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="font-light leading-relaxed">
          All client payment instructions are protected under end-to-end 256-bit encrypted security protocol.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodTab;
