import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useResendCooldown } from '../hooks/useResendCooldown';
import { AuthVerificationNotice } from '../components/AuthVerificationNotice';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const { resending, resendCooldown, setResendCooldown, resendStatus, triggerResend } =
    useResendCooldown();

  const user = useStore((state) => state.user);
  const registerUser = useStore((state) => state.registerUser);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/account';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const res = await registerUser(name.trim(), email.trim(), password, phone.trim());
    setLoading(false);

    if (res?.requireVerification) {
      setVerificationSent(true);
      setResendCooldown(60);
    } else if (res?.success) {
      navigate(redirect);
    } else {
      setError(res?.message || 'Registration failed');
    }
  };

  const handleResend = () => {
    triggerResend(email, 'signup');
  };

  return (
    <main className="py-10 sm:py-16 max-w-md mx-auto px-4 sm:px-6 space-y-8 min-h-[60vh] flex flex-col justify-center">
      <div className="bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {verificationSent ? (
          <AuthVerificationNotice
            email={email}
            title="Activation Link Sent"
            description="We have transmitted an account activation link to your email. Please click the link to activate your account."
            resending={resending}
            resendCooldown={resendCooldown}
            resendStatus={resendStatus}
            onResend={handleResend}
            onBack={() => {
              setVerificationSent(false);
              setPassword('');
              setConfirmPassword('');
              setError('');
            }}
            backText="Back to registration details"
          />
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
                <UserPlus className="w-6 h-6 text-neutral-400" />
              </div>
              <h1 className="text-2xl font-serif text-white">Create Account</h1>
              <p className="text-xs text-neutral-400 font-light">
                Register as an esteemed member of Nocturne
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="register-name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Full Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="Alexander Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="register-email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Email Address
                </label>
                <input
                  id="register-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="register-phone" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Phone Number
                </label>
                <input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="register-password" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="register-confirm-password" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  required
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-400 font-light">
                Already have an account?{' '}
                <Link
                  to={`/login${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="text-white underline font-medium hover:text-neutral-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Register;
