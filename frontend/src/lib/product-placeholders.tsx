// Welding Product Placeholder Images
// These are SVG-based placeholders for different product categories

export type ProductCategory = "electrozi" | "sarma" | "echipamente" | "accesorii" | "default";

// SVG placeholder components
export function ElectroziPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="electrod-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="electrod-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="electrod-coating" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#electrod-bg)" />

      {/* Multiple electrodes arranged */}
      <g transform="translate(80, 100)">
        {/* Electrode 1 */}
        <rect x="0" y="0" width="12" height="200" rx="2" fill="url(#electrod-metal)" />
        <rect x="0" y="30" width="12" height="150" rx="2" fill="url(#electrod-coating)" />

        {/* Electrode 2 */}
        <rect x="50" y="20" width="12" height="180" rx="2" fill="url(#electrod-metal)" />
        <rect x="50" y="50" width="12" height="130" rx="2" fill="url(#electrod-coating)" />

        {/* Electrode 3 */}
        <rect x="100" y="10" width="12" height="190" rx="2" fill="url(#electrod-metal)" />
        <rect x="100" y="40" width="12" height="140" rx="2" fill="url(#electrod-coating)" />

        {/* Electrode 4 */}
        <rect x="150" y="30" width="12" height="170" rx="2" fill="url(#electrod-metal)" />
        <rect x="150" y="60" width="12" height="120" rx="2" fill="url(#electrod-coating)" />

        {/* Electrode 5 */}
        <rect x="200" y="5" width="12" height="195" rx="2" fill="url(#electrod-metal)" />
        <rect x="200" y="35" width="12" height="145" rx="2" fill="url(#electrod-coating)" />
      </g>

      {/* Spark effects */}
      <circle cx="320" cy="120" r="3" fill="#fbbf24" opacity="0.8" />
      <circle cx="330" cy="140" r="2" fill="#f97316" opacity="0.6" />
      <circle cx="310" cy="150" r="2.5" fill="#fbbf24" opacity="0.7" />
    </svg>
  );
}

export function SarmaPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wire-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="wire-spool" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="wire-copper" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#wire-bg)" />

      {/* Wire spool */}
      <g transform="translate(200, 200)">
        {/* Outer rim */}
        <ellipse cx="0" cy="0" rx="120" ry="40" fill="url(#wire-spool)" />
        <ellipse cx="0" cy="-10" rx="120" ry="40" fill="#94a3b8" />

        {/* Wire coils */}
        <ellipse cx="0" cy="-10" rx="100" ry="33" fill="url(#wire-copper)" />
        <ellipse cx="0" cy="-20" rx="100" ry="33" fill="#d97706" />
        <ellipse cx="0" cy="-30" rx="100" ry="33" fill="url(#wire-copper)" />

        {/* Center hole */}
        <ellipse cx="0" cy="-30" rx="35" ry="12" fill="#475569" />
        <ellipse cx="0" cy="-35" rx="35" ry="12" fill="#64748b" />

        {/* Wire strand coming out */}
        <path d="M100,-25 Q140,-40 150,-80 Q160,-120 180,-130" stroke="#d97706" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}

export function EchipamentePlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="equip-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="equip-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="equip-panel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#equip-bg)" />

      {/* Welding machine body */}
      <g transform="translate(80, 80)">
        {/* Main body */}
        <rect x="0" y="40" width="240" height="200" rx="12" fill="url(#equip-body)" />
        <rect x="10" y="50" width="220" height="180" rx="8" fill="#0f172a" opacity="0.1" />

        {/* Control panel */}
        <rect x="20" y="60" width="200" height="100" rx="6" fill="url(#equip-panel)" />

        {/* Digital display */}
        <rect x="35" y="75" width="80" height="35" rx="4" fill="#1e3a5f" />
        <text x="50" y="100" fill="#22d3ee" fontSize="20" fontFamily="monospace" fontWeight="bold">185A</text>

        {/* Knobs */}
        <circle cx="150" cy="92" r="20" fill="#334155" />
        <circle cx="150" cy="92" r="15" fill="#475569" />
        <line x1="150" y1="77" x2="150" y2="85" stroke="#94a3b8" strokeWidth="2" />

        <circle cx="190" cy="92" r="15" fill="#334155" />
        <circle cx="190" cy="92" r="11" fill="#475569" />

        {/* Indicator lights */}
        <circle cx="40" y="140" r="5" fill="#22c55e" />
        <circle cx="60" y="140" r="5" fill="#64748b" />
        <circle cx="80" y="140" r="5" fill="#64748b" />

        {/* Ventilation grills */}
        <g transform="translate(20, 175)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={i * 25} y="0" width="18" height="4" rx="2" fill="#1e293b" opacity="0.3" />
          ))}
        </g>
        <g transform="translate(20, 185)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={i * 25} y="0" width="18" height="4" rx="2" fill="#1e293b" opacity="0.3" />
          ))}
        </g>

        {/* Handle */}
        <rect x="90" y="20" width="60" height="25" rx="8" fill="#334155" />
        <rect x="95" y="25" width="50" height="15" rx="5" fill="#1e293b" />

        {/* Brand stripe */}
        <rect x="0" y="220" width="240" height="20" rx="0" fill="#0f172a" opacity="0.2" />
      </g>
    </svg>
  );
}

export function AccesoriiPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="mask-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="visor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#acc-bg)" />

      {/* Welding mask */}
      <g transform="translate(100, 60)">
        {/* Mask body */}
        <path d="M100,0 L180,30 Q200,80 200,150 Q200,250 100,280 Q0,250 0,150 Q0,80 20,30 Z" fill="url(#mask-body)" />

        {/* Visor */}
        <rect x="30" y="80" width="140" height="80" rx="8" fill="url(#visor)" />
        <rect x="35" y="85" width="130" height="70" rx="6" fill="#059669" opacity="0.5" />

        {/* Visor reflection */}
        <path d="M40,90 L160,90 L155,100 L45,100 Z" fill="white" opacity="0.2" />

        {/* Headgear hint */}
        <path d="M20,50 Q100,-20 180,50" stroke="#475569" strokeWidth="8" fill="none" />

        {/* Adjustment knob */}
        <circle cx="185" cy="130" r="10" fill="#f97316" />
        <circle cx="185" cy="130" r="6" fill="#ea580c" />
      </g>

      {/* Welding glove */}
      <g transform="translate(230, 260)">
        <path d="M0,80 L10,20 Q15,0 35,0 L55,0 Q70,0 75,15 L85,60 Q90,80 80,100 L20,100 Q0,100 0,80 Z" fill="#92400e" />
        <path d="M35,0 L35,50" stroke="#78350f" strokeWidth="2" opacity="0.5" />
        <path d="M55,0 L55,45" stroke="#78350f" strokeWidth="2" opacity="0.5" />
        {/* Cuff */}
        <rect x="-5" y="100" width="95" height="30" rx="4" fill="#78350f" />
        <rect x="0" y="105" width="85" height="4" rx="2" fill="#92400e" />
        <rect x="0" y="115" width="85" height="4" rx="2" fill="#92400e" />
      </g>
    </svg>
  );
}

export function DefaultPlaceholder({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="default-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#default-bg)" />

      {/* Welding spark burst */}
      <g transform="translate(200, 200)">
        {/* Center glow */}
        <circle cx="0" cy="0" r="30" fill="#fbbf24" opacity="0.3" />
        <circle cx="0" cy="0" r="20" fill="#f97316" opacity="0.5" />
        <circle cx="0" cy="0" r="10" fill="#fbbf24" />

        {/* Spark rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * (60 + (i % 3) * 20)}
            y2={Math.sin((angle * Math.PI) / 180) * (60 + (i % 3) * 20)}
            stroke="url(#spark-grad)"
            strokeWidth={3 - (i % 3)}
            opacity={0.8 - (i % 3) * 0.2}
          />
        ))}

        {/* Flying sparks */}
        <circle cx="70" cy="-40" r="4" fill="#fbbf24" />
        <circle cx="-50" cy="60" r="3" fill="#f97316" />
        <circle cx="80" cy="30" r="3" fill="#fbbf24" />
        <circle cx="-70" cy="-30" r="4" fill="#f97316" />
        <circle cx="40" cy="80" r="3" fill="#fbbf24" />
        <circle cx="-30" cy="-70" r="3" fill="#f97316" />
      </g>

      {/* Welding text hint */}
      <text x="200" y="340" textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="system-ui">
        Produs Sudură
      </text>
    </svg>
  );
}

// Helper function to get placeholder by category
export function getProductPlaceholder(category?: string): React.FC<{ className?: string }> {
  const normalized = category?.toLowerCase();

  switch (normalized) {
    case "electrozi":
    case "electrozi de sudură":
      return ElectroziPlaceholder;
    case "sarma":
    case "sârmă":
    case "sârmă de sudură":
      return SarmaPlaceholder;
    case "echipamente":
    case "echipament":
      return EchipamentePlaceholder;
    case "accesorii":
    case "accesoriu":
      return AccesoriiPlaceholder;
    default:
      return DefaultPlaceholder;
  }
}

// Data URI versions for use in img tags
export const placeholderDataURIs = {
  electrozi: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#94a3b8"/><stop offset="50%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#94a3b8"/></linearGradient><linearGradient id="c" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ea580c"/><stop offset="50%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient></defs><rect width="400" height="400" fill="url(#a)"/><g transform="translate(80,100)"><rect width="12" height="200" rx="2" fill="url(#b)"/><rect y="30" width="12" height="150" rx="2" fill="url(#c)"/><rect x="50" y="20" width="12" height="180" rx="2" fill="url(#b)"/><rect x="50" y="50" width="12" height="130" rx="2" fill="url(#c)"/><rect x="100" y="10" width="12" height="190" rx="2" fill="url(#b)"/><rect x="100" y="40" width="12" height="140" rx="2" fill="url(#c)"/><rect x="150" y="30" width="12" height="170" rx="2" fill="url(#b)"/><rect x="150" y="60" width="12" height="120" rx="2" fill="url(#c)"/><rect x="200" y="5" width="12" height="195" rx="2" fill="url(#b)"/><rect x="200" y="35" width="12" height="145" rx="2" fill="url(#c)"/></g><circle cx="320" cy="120" r="3" fill="#fbbf24" opacity=".8"/><circle cx="330" cy="140" r="2" fill="#f97316" opacity=".6"/><circle cx="310" cy="150" r="2.5" fill="#fbbf24" opacity=".7"/></svg>`)}`,

  sarma: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#64748b"/><stop offset="50%" stop-color="#94a3b8"/><stop offset="100%" stop-color="#64748b"/></linearGradient><linearGradient id="c" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#b45309"/><stop offset="50%" stop-color="#d97706"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs><rect width="400" height="400" fill="url(#a)"/><g transform="translate(200,200)"><ellipse rx="120" ry="40" fill="url(#b)"/><ellipse cy="-10" rx="120" ry="40" fill="#94a3b8"/><ellipse cy="-10" rx="100" ry="33" fill="url(#c)"/><ellipse cy="-20" rx="100" ry="33" fill="#d97706"/><ellipse cy="-30" rx="100" ry="33" fill="url(#c)"/><ellipse cy="-30" rx="35" ry="12" fill="#475569"/><ellipse cy="-35" rx="35" ry="12" fill="#64748b"/><path d="M100-25Q140-40 150-80Q160-120 180-130" stroke="#d97706" stroke-width="3" fill="none"/></g></svg>`)}`,

  echipamente: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient><linearGradient id="c" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><rect width="400" height="400" fill="url(#a)"/><g transform="translate(80,80)"><rect y="40" width="240" height="200" rx="12" fill="url(#b)"/><rect x="20" y="60" width="200" height="100" rx="6" fill="url(#c)"/><rect x="35" y="75" width="80" height="35" rx="4" fill="#1e3a5f"/><text x="50" y="100" fill="#22d3ee" font-size="20" font-family="monospace" font-weight="bold">185A</text><circle cx="150" cy="92" r="20" fill="#334155"/><circle cx="150" cy="92" r="15" fill="#475569"/><circle cx="40" cy="140" r="5" fill="#22c55e"/><rect x="90" y="20" width="60" height="25" rx="8" fill="#334155"/></g></svg>`)}`,

  accesorii: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient><linearGradient id="c" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#065f46"/><stop offset="50%" stop-color="#047857"/><stop offset="100%" stop-color="#065f46"/></linearGradient></defs><rect width="400" height="400" fill="url(#a)"/><g transform="translate(100,60)"><path d="M100 0L180 30Q200 80 200 150Q200 250 100 280Q0 250 0 150Q0 80 20 30Z" fill="url(#b)"/><rect x="30" y="80" width="140" height="80" rx="8" fill="url(#c)"/><path d="M40 90L160 90L155 100L45 100Z" fill="#fff" opacity=".2"/><path d="M20 50Q100-20 180 50" stroke="#475569" stroke-width="8" fill="none"/><circle cx="185" cy="130" r="10" fill="#f97316"/></g><g transform="translate(230,260)"><path d="M0 80L10 20Q15 0 35 0H55Q70 0 75 15L85 60Q90 80 80 100H20Q0 100 0 80Z" fill="#92400e"/><rect x="-5" y="100" width="95" height="30" rx="4" fill="#78350f"/></g></svg>`)}`,

  default: `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f8fafc"/><stop offset="100%" stop-color="#e2e8f0"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#f97316"/></linearGradient></defs><rect width="400" height="400" fill="url(#a)"/><g transform="translate(200,200)"><circle r="30" fill="#fbbf24" opacity=".3"/><circle r="20" fill="#f97316" opacity=".5"/><circle r="10" fill="#fbbf24"/><line x1="0" y1="0" x2="60" y2="0" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="52" y2="30" stroke="url(#b)" stroke-width="2" opacity=".6"/><line x1="0" y1="0" x2="30" y2="52" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="0" y2="80" stroke="url(#b)" stroke-width="2" opacity=".6"/><line x1="0" y1="0" x2="-30" y2="52" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="-52" y2="30" stroke="url(#b)" stroke-width="2" opacity=".6"/><line x1="0" y1="0" x2="-60" y2="0" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="-52" y2="-30" stroke="url(#b)" stroke-width="2" opacity=".6"/><line x1="0" y1="0" x2="-30" y2="-52" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="0" y2="-80" stroke="url(#b)" stroke-width="2" opacity=".6"/><line x1="0" y1="0" x2="30" y2="-52" stroke="url(#b)" stroke-width="3" opacity=".8"/><line x1="0" y1="0" x2="52" y2="-30" stroke="url(#b)" stroke-width="2" opacity=".6"/><circle cx="70" cy="-40" r="4" fill="#fbbf24"/><circle cx="-50" cy="60" r="3" fill="#f97316"/><circle cx="80" cy="30" r="3" fill="#fbbf24"/><circle cx="-70" cy="-30" r="4" fill="#f97316"/></g><text x="200" y="340" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="system-ui">Produs Sudură</text></svg>`)}`,
};

// Helper to get data URI by category
export function getPlaceholderDataURI(category?: string): string {
  const normalized = category?.toLowerCase();

  switch (normalized) {
    case "electrozi":
    case "electrozi de sudură":
      return placeholderDataURIs.electrozi;
    case "sarma":
    case "sârmă":
    case "sârmă de sudură":
      return placeholderDataURIs.sarma;
    case "echipamente":
    case "echipament":
      return placeholderDataURIs.echipamente;
    case "accesorii":
    case "accesoriu":
      return placeholderDataURIs.accesorii;
    default:
      return placeholderDataURIs.default;
  }
}
