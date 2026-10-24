import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../lib/utils';

export const OrdersList = ({ orders = [], loading = false }) => {
  return (
    <div className="space-y-4 pt-4 border-t border-neutral-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-neutral-400" />
          <h3 className="font-serif text-lg text-white">Acquisition Archive ({orders.length})</h3>
        </div>
        {loading && (
          <span className="text-xs text-neutral-500 font-mono">Syncing atelier database...</span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-xl text-center space-y-2">
          <p className="text-xs text-neutral-400">No previous orders recorded for this account.</p>
          <Link to="/shop" className="inline-block text-xs uppercase tracking-widest text-white underline pt-1 hover:text-neutral-300">
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord._id}
              className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center space-x-3">
                {ord.orderItems?.[0]?.image && (
                  <img
                    src={getImageUrl(ord.orderItems[0].image)}
                    alt={ord.orderItems[0].name || 'Garment'}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="w-12 h-14 object-cover rounded-lg bg-neutral-950 shrink-0 border border-neutral-800"
                  />
                )}
                <div>
                  <p className="font-mono text-neutral-400 text-[11px]">
                    ID: {ord._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="font-serif text-white text-sm mt-0.5">
                    {ord.orderItems?.map((it) => it.name).join(', ')}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {new Date(ord.createdAt).toLocaleDateString()} | {ord.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/60">
                <span className="font-semibold text-white text-sm">${Number(ord.totalPrice).toFixed(2)}</span>
                <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-[10px] uppercase tracking-wider rounded-full font-medium">
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
