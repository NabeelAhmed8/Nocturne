import { useState } from 'react';
import { Settings, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const SettingsTab = () => {
  const updatePassword = useStore((state) => state.updatePassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await updatePassword(password);
    setLoading(false);

    if (res?.success) {
      setSuccess('Your atelier security credentials have been updated successfully.');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError(res?.message || 'Failed to update password.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-2 text-white">
          <Settings className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-serif">Account Security & Credentials</h2>
        </div>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Manage your atelier authentication credentials and account preferences.
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

      <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl space-y-5">
        <div className="flex items-center space-x-3 text-white border-b border-neutral-800/80 pb-3">
          <Lock className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm uppercase tracking-widest font-serif">Update Password</h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
              New Password
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="Enter new secure password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="Re-enter new secure password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-xl"
            >
              {loading ? 'Encrypting & Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsTab;
