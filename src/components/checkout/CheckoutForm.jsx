import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, UserCheck, AlertCircle, Banknote } from 'lucide-react';

export const CheckoutForm = ({
  user,
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  cart,
  grandTotal,
  shippingFee,
}) => {
  return (
    <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Catalog</span>
      </Link>

      <div className="bg-[#111] border border-neutral-800 p-5 sm:p-10 rounded-xl sm:rounded-2xl space-y-6 sm:space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">Atelier Transmission</span>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">Final Acquisition Checkout</h1>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-900/60">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Tunnel</span>
          </div>
        </div>

        {/* Authenticated Client Identification Banner */}
        <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">Authenticated Client</p>
              <p className="text-white font-medium">{user.name} <span className="text-neutral-400 font-normal">({user.email})</span></p>
            </div>
          </div>
          <Link
            to="/login?redirect=/checkout"
            className="text-[11px] text-neutral-400 hover:text-white underline"
          >
            Switch Account
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-xl text-red-400 text-xs flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Client Shipping Coordinates */}
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-widest font-serif text-white border-b border-neutral-800/80 pb-2">
              1. Delivery Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="checkout-name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Julian Vance"
                  value={formData.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  Email Address for Courier Tracking
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="checkout-phone" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  Contact Phone (Courier Physical Handoff)
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="checkout-address" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  Street Address & Residence / Suite
                </label>
                <input
                  id="checkout-address"
                  name="address"
                  required
                  type="text"
                  autoComplete="street-address"
                  placeholder="Apartment, suite, unit, building, floor, street address"
                  value={formData.address}
                  onChange={(e) => onChange('address', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-city" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  City
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  required
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. New York, London, Tokyo"
                  value={formData.city}
                  onChange={(e) => onChange('city', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-postalCode" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  Postal / ZIP Code
                </label>
                <input
                  id="checkout-postalCode"
                  name="postalCode"
                  required
                  type="text"
                  autoComplete="postal-code"
                  placeholder="e.g. 10012"
                  value={formData.postalCode}
                  onChange={(e) => onChange('postalCode', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Method - Cash on Delivery Only */}
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-widest font-serif text-white border-b border-neutral-800/80 pb-2">
              2. Payment Method
            </h2>

            <div className="p-5 rounded-xl border border-neutral-700 bg-neutral-900/90 text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-serif font-semibold text-white">Cash on Delivery (COD)</p>
                    <p className="text-xs text-neutral-400 font-light mt-0.5 leading-relaxed">
                      Pay in cash when your order is delivered to your doorstep.
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border border-emerald-400 bg-emerald-400 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-900/40 border border-neutral-800/80 rounded-lg">
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                <span className="text-neutral-200 font-medium">Notice:</span> Currently, only Cash on Delivery is active. Online card payment (Stripe) will be enabled in an upcoming release.
              </p>
            </div>
          </div>

          {/* Bag Summary & Order Confirmation Button */}
          <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">Total Acquisition Investment</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-serif text-white">${grandTotal.toFixed(2)}</span>
                <span className="text-xs text-neutral-500 font-mono">
                  ({shippingFee === 0 ? 'Complimentary Courier' : '+$20.00 Express Transit'})
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Confirming Order...' : 'Place Order (Cash on Delivery)'}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckoutForm;
