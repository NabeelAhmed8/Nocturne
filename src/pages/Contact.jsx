import { useState, useEffect } from 'react';
import { Mail, MapPin, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [atelierInfo, setAtelierInfo] = useState(null);
  const [atelierLoading, setAtelierLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.get('/atelier')
      .then((res) => {
        if (isMounted && res?.atelier?.flagshipAtelier) {
          setAtelierInfo(res.atelier.flagshipAtelier);
        }
      })
      .catch(() => {
        // If server offline, keep null
      })
      .finally(() => {
        if (isMounted) setAtelierLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/contact', { name, email, message });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to transmit inquiry to atelier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Client Concierge</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white">Contact & Atelier Inquiries</h1>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Our client concierge is at your service for bespoke appointments, fitting consultations, and order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl p-5 sm:p-8">
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-white">Flagship Atelier</h2>
          {atelierLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-800 rounded w-1/2" />
              <div className="h-4 bg-neutral-800 rounded w-2/3" />
            </div>
          ) : atelierInfo ? (
            <div className="space-y-4 text-xs font-light text-neutral-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-neutral-300 mt-0.5 shrink-0" />
                <span>{atelierInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>{atelierInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>{atelierInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>{atelierInfo.hours}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-950/30 border border-red-900/40 rounded-xl text-red-400 text-xs">
              Atelier concierge desk records are currently unreachable (Server is offline).
            </div>
          )}
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <h3 className="text-lg font-serif text-white">Inquiry Received</h3>
            <p className="text-xs text-neutral-400 font-light">
              Our atelier concierge will respond to your transmission within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
              className="text-xs uppercase tracking-widest text-neutral-400 underline hover:text-white pt-2 cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg text-red-400 text-xs">
                {error}
              </div>
            )}
            <div className="space-y-1">
              <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Your Name</label>
              <input
                id="contact-name"
                name="name"
                required
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Email</label>
              <input
                id="contact-email"
                name="email"
                required
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="How may our concierge assist you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Transmitting...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Contact;
