import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Settings, LogIn, UserPlus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { api, isBackendConfigured } from '../lib/api';
import { OfflineNotice } from '../components/OfflineNotice';
import { ProfileTab } from '../components/account/ProfileTab';
import { AddressTab } from '../components/account/AddressTab';
import { PaymentMethodTab } from '../components/account/PaymentMethodTab';
import { SettingsTab } from '../components/account/SettingsTab';

export const Account = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const isServerOnline = useStore((state) => state.isServerOnline);
  const checkServerHealth = useStore((state) => state.checkServerHealth);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'address' | 'payment' | 'settings'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch real orders from MongoDB backend when user is logged in
  useEffect(() => {
    let isMounted = true;
    if (user) {
      const fetchOrders = async () => {
        try {
          if (isMounted) setLoadingOrders(true);
          const data = await api.get('/orders/myorders');
          if (isMounted && data?.orders) {
            setOrders(data.orders);
          }
        } catch {
          // Keep empty if orders endpoint fails
        } finally {
          if (isMounted) setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Orders', icon: User },
    { id: 'address', label: 'Delivery Address', icon: MapPin },
    { id: 'payment', label: 'Payment Method', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isBackendConfigured || !isServerOnline) {
    return (
      <OfflineNotice
        title="Server is Offline"
        message="Atelier client portal and account records cannot be retrieved because the backend server is unreachable."
        onRetry={checkServerHealth}
        returnTo="/"
        returnText="Return to Home"
      />
    );
  }

  return (
    <main className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 min-h-[60vh]">
      <div className="border-b border-neutral-800 pb-6 sm:pb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Client Portal</span>
        <h1 className="text-2xl sm:text-4xl font-serif text-white mt-1">Atelier Account</h1>
      </div>

      {user ? (
        <div className="space-y-6 sm:space-y-8">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 sm:pb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              if (!isBackendConfigured || !isServerOnline) {
    return (
      <OfflineNotice
        title="Server is Offline"
        message="Atelier client portal and account records cannot be retrieved because the backend server is unreachable."
        onRetry={checkServerHealth}
        returnTo="/"
        returnText="Return to Home"
      />
    );
  }

  return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-102'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-2xl">
            {activeTab === 'profile' && (
              <ProfileTab
                user={user}
                onLogout={handleLogout}
                orders={orders}
                loadingOrders={loadingOrders}
              />
            )}

            {activeTab === 'address' && <AddressTab user={user} />}

            {activeTab === 'payment' && <PaymentMethodTab />}

            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-[#111] border border-neutral-800 rounded-2xl p-8 space-y-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
            <User className="w-7 h-7 text-neutral-300" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-white">Sign In to Atelier</h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Access your permanent acquisition archive, track shipments, and manage your client privileges.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login?redirect=/account"
              className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center space-x-2 shadow-xl"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Account</span>
            </Link>

            <Link
              to="/register?redirect=/account"
              className="w-full py-4 bg-neutral-900 border border-neutral-700 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:border-white transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Client Account</span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Account;
