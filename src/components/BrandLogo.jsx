import { Link } from 'react-router-dom';

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.jpg`;

const SIZES = {
  sm: { img: 'w-6 h-6', text: 'text-base sm:text-lg' },
  md: { img: 'w-7 h-7 sm:w-8 sm:h-8', text: 'text-lg sm:text-2xl' },
  lg: { img: 'w-9 h-9 sm:w-10 sm:h-10', text: 'text-xl sm:text-3xl' },
};

export const BrandLogo = ({
  showText = true,
  size = 'md',
  asLink = true,
  className = '',
}) => {
  const currentSize = SIZES[size] || SIZES.md;

  const content = (
    <div className={`inline-flex items-center space-x-2.5 group select-none ${className}`}>
      <img
        src={LOGO_SRC}
        alt="Nocturne Atelier Emblem"
        className={`${currentSize.img} object-contain rounded-full border border-neutral-800/80 shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:border-neutral-600`}
        loading="eager"
      />
      {showText && (
        <span
          className={`${currentSize.text} font-serif tracking-[0.2em] sm:tracking-[0.25em] font-bold uppercase text-white transition-opacity group-hover:opacity-90`}
        >
          Nocturne
        </span>
      )}
    </div>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="Nocturne Home">
      {content}
    </Link>
  );
};

export default BrandLogo;
