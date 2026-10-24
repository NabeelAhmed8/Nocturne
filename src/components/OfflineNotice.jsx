import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const OfflineNotice = ({
  title = 'Server is Offline',
  message = 'The atelier records cannot be retrieved because the backend server is unreachable.',
  onRetry,
  retryText = 'Retry Connection',
  returnTo = '/',
  returnText = 'Return to Home',
}) => {
  return (
    <main className="py-24 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-900/60 flex items-center justify-center mx-auto text-red-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-serif text-white tracking-wide uppercase">{title}</h1>
      <p className="text-sm text-neutral-400 font-light leading-relaxed">
        {message}
      </p>
      <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{retryText}</span>
          </button>
        )}
        {returnTo && (
          <Link
            to={returnTo}
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-800 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all inline-flex items-center justify-center"
          >
            {returnText}
          </Link>
        )}
      </div>
    </main>
  );
};

export default OfflineNotice;
