import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User as UserIcon, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useResendCooldown } from '../hooks/useResendCooldown';
import { TokenVerificationView } from '../components/auth/TokenVerificationView';
import { AuthVerificationNotice } from '../components/AuthVerificationNotice';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const { resending, resendCooldown, setResendCooldown, resendStatus, triggerResend } =
    useResendCooldown();

  const user = useStore((state) => state.user);
  const loginUser = useStore((state) => state.loginUser);
  const verifyEmailToken = useStore((state) => state.verifyEmailToken);
  const verifyLoginToken = useStore((state) => state.verifyLoginToken);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/account';
  const token = queryParams.get('token');
  const isVerifyRoute = location.pathname.includes('verify-');

  const [tokenStatus, setTokenStatus] = useState(
    token ? 'loading' : isVerifyRoute ? 'error' : ''
  );
  const [tokenMsg, setTokenMsg] = useState(
    !token && isVerifyRoute ? 'No verification token provided. Please click the link directly from your email.' : ''
  );

  useEffect(() => {
    if (user && !tokenStatus) {
      navigate(redirect);
    }
  }, [user, navigate, redirect, tokenStatus]);

  useEffect(() => {
    if (!token) return;

    const runVerify = async () => {
      setTokenStatus('loading');
      const verifyFunc = location.pathname.includes('verify-email')
        ? verifyEmailToken
        : verifyLoginToken;

      const res = await verifyFunc(token);
      if (res?.success) {
        setTokenStatus('success');
        setTokenMsg(res.message || 'Verification successful! Welcome.');
      } else {
        setTokenStatus('error');
        setTokenMsg(res?.message || 'Verification link is invalid or expired.');
      }
    };

    runVerify();
  }, [token, location.pathname, verifyEmailToken, verifyLoginToken, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await loginUser(email, password);
    setLoading(false);

    if (res?.requireVerification) {
      setVerificationSent(true);
      setResendCooldown(60);
    } else if (res?.success) {
      navigate(redirect);
    } else {
      setError(res?.message || 'Invalid email or password credentials');
    }
  };

  const handleResend = () => {
    triggerResend(email, 'login');
  };

  return (
    <main className="py-10 sm:py-16 max-w-md mx-auto px-4 sm:px-6 space-y-8 min-h-[60vh] flex flex-col justify-center">
      <div className="bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Case 1: Token verification from email link */}
        {tokenStatus ? (
          <TokenVerificationView
            status={tokenStatus}
            message={tokenMsg}
            onEnter={() => navigate(redirect)}
            onRetry={() => {
              setTokenStatus('');
              navigate('/login');
            }}
          />
        ) : verificationSent ? (
          /* Case 2: Verification Link Sent State */
          <AuthVerificationNotice
            email={email}
            title="Check Your Inbox"
            description="We have transmitted a secure sign-in link to your email. Please click the link in your email to authenticate your atelier account."
            resending={resending}
            resendCooldown={resendCooldown}
            resendStatus={resendStatus}
            onResend={handleResend}
            onBack={() => {
              setVerificationSent(false);
              setPassword('');
              setError('');
            }}
            backText="Use a different email / Back"
          />
        ) : (
          /* Case 3: Normal Sign In Form */
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
                <UserIcon className="w-6 h-6 text-neutral-400" />
              </div>
              <h1 className="text-2xl font-serif text-white">Sign In</h1>
              <p className="text-xs text-neutral-400 font-light">
                Access your nocturnal wardrobe & order archive
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg text-red-400 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="login-email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Email Address
                </label>
                <input
                  id="login-email"
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
                <label htmlFor="login-password" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  required
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Atelier'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-400 font-light">
                New to Nocturne?{' '}
                <Link
                  to={`/register${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="text-white underline font-medium hover:text-neutral-300"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
