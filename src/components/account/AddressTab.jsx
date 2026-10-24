import { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AddressTab = ({ user }) => {
  const updateUserProfile = useStore((state) => state.updateUserProfile);

  const initialAddress = user?.shippingAddress || {};
  const [address, setAddress] = useState(initialAddress.address || '');
  const [city, setCity] = useState(initialAddress.city || '');
  const [postalCode, setPostalCode] = useState(initialAddress.postalCode || '');
  const [phone, setPhone] = useState(initialAddress.phone || user?.phone || '');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      setError('Please provide complete destination coordinates.');
      return;
    }

    setSaving(true);
    const res = await updateUserProfile({
      phone: phone.trim(),
      shippingAddress: {
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        phone: phone.trim(),
      },
    });
    setSaving(false);

    if (res?.success) {
      setSuccess('Primary delivery coordinates updated in atelier archive.');
    } else {
      setError(res?.message || 'Failed to update address coordinates.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-serif">Delivery Destination Coordinates</h2>
        </div>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Save your primary courier destination for accelerated acquisition checkout.
        </p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-red-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Street Address & Residence / Suite
          </label>
          <input
            type="text"
            required
            placeholder="Apartment, suite, unit, building, floor, street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
              City
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New York, London, Tokyo"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
              Postal / ZIP Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 10012"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Courier Contact Phone
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-xl"
          >
            {saving ? 'Updating Coordinates...' : 'Save Delivery Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressTab;
