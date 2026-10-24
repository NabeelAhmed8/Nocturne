import { LogOut, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const ProfileCard = ({ user, onLogout }) => {
  return (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-xl font-serif">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-serif text-white">{user.name}</h2>
            <p className="text-xs text-neutral-400">
              {user.email}
              {user.phone ? ` • ${user.phone}` : ''}
            </p>
            <span className="inline-block mt-1 text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
              {user.memberTier || 'Atelier Circle'}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="self-start sm:self-auto px-5 py-2.5 border border-neutral-800 rounded-full text-xs uppercase tracking-widest text-red-400 hover:bg-neutral-900 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Member Privileges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="flex items-center space-x-2 text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest">Member Status</span>
          </div>
          <p className="text-sm font-semibold text-white">Active Atelier Privileges</p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Truck className="w-4 h-4 text-neutral-300" />
            <span className="text-[10px] uppercase tracking-widest">Complimentary Courier</span>
          </div>
          <p className="text-sm font-semibold text-white">Global Express Enabled</p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Headphones className="w-4 h-4 text-neutral-300" />
            <span className="text-[10px] uppercase tracking-widest">Concierge Desk</span>
          </div>
          <p className="text-sm font-semibold text-white">Direct Line Priority</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
