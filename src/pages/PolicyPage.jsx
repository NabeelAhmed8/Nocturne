import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { POLICIES_DATA, POLICY_NAV_TABS } from '../data/policiesData';

export const PolicyPage = ({ type, badge = 'Atelier Protocol' }) => {
  const data = POLICIES_DATA[type] || POLICIES_DATA.shipping;

  return (
    <main className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      <Link to="/" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      {/* Policy Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
        {POLICY_NAV_TABS.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
              type === tab.id
                ? 'bg-white text-black shadow-md'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4 border-b border-neutral-800 pb-6 sm:pb-8">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">{data.badge || badge}</span>
          {data.lastUpdated && (
            <span className="text-[10px] text-neutral-500 font-mono">| {data.lastUpdated}</span>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-white">{data.title}</h1>
        {data.subtitle && (
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{data.subtitle}</p>
        )}
      </div>

      <div className="space-y-6 sm:space-y-8">
        {data.sections?.map((section, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-8 bg-[#111] border border-neutral-800 rounded-xl sm:rounded-2xl space-y-4 shadow-xl"
          >
            <h2 className="text-base font-serif text-white font-medium flex items-center space-x-2">
              <span className="text-neutral-500 font-mono text-xs">0{idx + 1}.</span>
              <span>{section.heading}</span>
            </h2>

            {section.content && (
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {section.content}
              </p>
            )}

            {/* Custom Table Rendering for Sizing Guide */}
            {section.table && Array.isArray(section.table) && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-400">
                      {Object.keys(section.table[0]).map((key) => (
                        <th key={key} className="py-3 px-4 font-semibold">
                          {key.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {section.table.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-neutral-900/40 transition-colors">
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className={`py-3.5 px-4 font-mono ${cIdx === 0 ? 'text-white font-bold' : ''}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default PolicyPage;
