import { Mail, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AuthVerificationNotice = ({
  email,
  title = 'Verification Link Transmitted',
  description = 'We have transmitted a secure activation link to your email address. Please click the link in your email to authenticate your atelier account.',
  resending = false,
  resendCooldown = 0,
  resendStatus = '',
  onResend,
  onBack,
  backText = 'Return to Sign In',
}) => {
  return (
    <div className="space-y-6 text-center py-2">
      <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
        <Mail className="w-7 h-7 text-neutral-200" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Security Clearance</span>
        <h2 className="text-2xl font-serif text-white">{title}</h2>
        <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {email && (
        <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs font-mono text-white max-w-xs mx-auto break-all">
          {email}
        </div>
      )}

      {resendStatus && (
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-300 flex items-center justify-center space-x-2 max-w-sm mx-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{resendStatus}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col items-center gap-3">
        {onResend && (
          <button
            type="button"
            onClick={onResend}
            disabled={resending || resendCooldown > 0}
            className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all ${
              resendCooldown > 0 || resending
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
                : 'bg-white text-black hover:bg-neutral-200 cursor-pointer shadow-lg'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>
              {resending
                ? 'Transmitting...'
                : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : 'Resend Verification Link'}
            </span>
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-neutral-400 hover:text-white text-xs underline cursor-pointer pt-2"
          >
            {backText}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthVerificationNotice;
