import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { OfflineNotice } from '../components/OfflineNotice';

export const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/atelier');
      if (res?.atelier) {
        setData(res.atelier);
      }
    } catch (err) {
      setData(null);
      setError(err.message || 'Backend server is offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInfo();
  }, [loadInfo]);

  return (
    <main className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      <div className="text-center space-y-3 sm:space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Atelier Heritage & Form</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-light text-white">About Nocturne</h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
          The philosophy, sustainable material standards, and architectural design principles behind our garments.
        </p>
      </div>

      {loading ? (
        <div className="bg-[#111] border border-neutral-800 rounded-2xl p-12 text-center animate-pulse">
          <span className="text-xs text-neutral-500 font-serif uppercase tracking-widest">
            Loading Atelier Archive...
          </span>
        </div>
      ) : error ? (
        <OfflineNotice
          title="Server is Offline"
          message="Atelier heritage records cannot be retrieved because the backend server is unreachable."
          onRetry={loadInfo}
          returnTo="/"
          returnText="Return to Home"
        />
      ) : !data ? (
        <div className="text-center py-20 border border-neutral-800 rounded-2xl bg-[#111] space-y-3 p-8">
          <p className="font-serif text-lg text-white">No Atelier Records Found</p>
        </div>
      ) : (
        <>
          {/* Main Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl p-5 sm:p-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Core Ideology</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
                Architectural Form Meets Enduring Organic Craft
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {data.philosophy}
              </p>
              <div className="pt-4 flex items-center justify-between sm:justify-start space-x-4 sm:space-x-8 border-t border-neutral-800 text-xs">
                <div>
                  <p className="font-serif text-lg text-white">{data.stats?.established || 2026}</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">Established</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-white">{data.stats?.organicTraceability || '100%'}</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">Traceability</p>
                </div>
                <div>
                  <p className="font-serif text-lg text-white">{data.stats?.flagship || 'SoHo'}</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">Atelier</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t md:border-t-0 md:border-l border-neutral-800 pt-8 md:pt-0 md:pl-12">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Textile Architecture</span>
              <h3 className="text-xl font-serif text-white">Uncompromising Materials</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {data.sustainability}
              </p>
              {data.materialStandards && (
                <ul className="space-y-2 text-xs text-neutral-300">
                  {data.materialStandards.map((std, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-8 space-y-3">
              <Compass className="w-6 h-6 text-neutral-300 mx-auto" />
              <h4 className="font-serif text-base text-white">Structural Precision</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Each silhouette balances mathematical proportions with effortless movement.
              </p>
            </div>
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-8 space-y-3">
              <ShieldCheck className="w-6 h-6 text-neutral-300 mx-auto" />
              <h4 className="font-serif text-base text-white">Conscious Permanence</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {data.sustainability || 'Strict carbon-neutral commitments and ethical artisan relationships.'}
              </p>
            </div>
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-8 space-y-3">
              <Sparkles className="w-6 h-6 text-neutral-300 mx-auto" />
              <h4 className="font-serif text-base text-white">Artisanal Finish</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Small-batch runs milled in historic Japanese and Northern Italian textile houses.
              </p>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default About;
