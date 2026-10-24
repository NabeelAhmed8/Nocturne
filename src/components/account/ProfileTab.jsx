import { Link } from 'react-router-dom';
import { ProfileCard } from './ProfileCard';
import { OrdersList } from './OrdersList';

export const ProfileTab = ({ user, onLogout, orders, loadingOrders }) => {
  return (
    <div className="space-y-8">
      <ProfileCard user={user} onLogout={onLogout} />

      <OrdersList orders={orders} loading={loadingOrders} />

      <div className="pt-4 flex flex-wrap gap-4 border-t border-neutral-800">
        <Link
          to="/shop"
          className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all shadow-lg"
        >
          Explore New Drops
        </Link>
        <Link
          to="/lookbook"
          className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-800 transition-all"
        >
          View Runway Lookbook
        </Link>
      </div>
    </div>
  );
};

export default ProfileTab;
