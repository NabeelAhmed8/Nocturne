import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const TokenVerificationView = ({
  status,
  message,
  onEnter,
  onRetry,
  autoRedirectSeconds = 3,
}) => {
  const [countdown, setCountdown] = useState(autoRedirectSeconds);

  useEffect(() => {
    if (status !== 'success') return;

    if (countdown <= 0) {
      onEnter();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, countdown, onEnter]);

  return (
    <div className="space-y-6 text-center py-4">
      {status === 'loading' && (
        <div className="space-y-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
            <RefreshCw className="w-7 h-7 text-neutral-300 animate-spin" />
          </div>
          <h1 className="text-2xl font-serif text-white">Verifying Link...</h1>
          <p className="text-xs text-neutral-400 font-light">
            Please hold while we authenticate your request.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-emerald-900/60 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif text-white">Verified Successfully</h1>
            <p className="text-xs text-neutral-300 font-light">{message}</p>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Redirecting to profile in{' '}
                <strong className="text-white font-bold">{countdown}s</strong>...
              </span>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-5">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-red-900/60 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif text-white">Verification Failed</h1>
          <p className="text-xs text-red-300 font-light">{message}</p>
          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={onRetry}
              className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Return to Sign In
            </button>
            <Link
              to="/register"
              className="block text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Need an account? Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenVerificationView;
