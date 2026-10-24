import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const Success = () => (
  <main className="py-24 max-w-xl mx-auto px-4 text-center space-y-6 min-h-[60vh] flex flex-col justify-center">
    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle2 className="w-10 h-10" />
    </div>
    <h1 className="text-3xl font-serif text-white">Acquisition Confirmed</h1>
    <p className="text-sm text-neutral-400 font-light leading-relaxed">
      Your acquisition order has been recorded in the atelier database and queued for hand-inspection. You can view your live order status in your client portal.
    </p>
    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
      <Link 
        to="/account"
        className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-800 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all text-center"
      >
        View Order Archive
      </Link>
      <Link 
        to="/"
        className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all text-center"
      >
        Return to Home
      </Link>
    </div>
  </main>
);

export default Success;

