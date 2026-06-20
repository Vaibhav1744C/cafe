/**
 * SteamEffect — CSS-only animated steam wisps.
 *
 * Place this component near coffee-cup images to add a subtle atmospheric
 * steam effect. All animation is driven by CSS @keyframes injected inline,
 * so there are zero runtime dependencies beyond React.
 *
 * The animation is automatically suppressed when the user has enabled
 * "prefers-reduced-motion: reduce" at the OS level.
 */

const STEAM_CSS = `
@keyframes steam-rise {
  0%   { transform: translateY(0)   scaleX(1);   opacity: 0; }
  15%  { opacity: 0.55; }
  50%  { transform: translateY(-28px) scaleX(1.2); opacity: 0.4; }
  100% { transform: translateY(-56px) scaleX(0.8); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .steam-wisp {
    animation: none !important;
    opacity: 0 !important;
  }
}

.steam-wisp {
  position: absolute;
  bottom: 100%;
  width: 4px;
  border-radius: 9999px;
  background: rgba(245, 236, 215, 0.7);
  animation: steam-rise 2.4s ease-in-out infinite;
  filter: blur(1.5px);
}

.steam-wisp:nth-child(1) {
  left: 38%;
  height: 22px;
  animation-delay: 0s;
  animation-duration: 2.2s;
}

.steam-wisp:nth-child(2) {
  left: 50%;
  height: 28px;
  animation-delay: 0.7s;
  animation-duration: 2.6s;
}

.steam-wisp:nth-child(3) {
  left: 62%;
  height: 20px;
  animation-delay: 1.3s;
  animation-duration: 2.4s;
}
`

interface SteamEffectProps {
  /** Extra Tailwind / className for the wrapper */
  className?: string
}

export default function SteamEffect({ className = '' }: SteamEffectProps) {
  return (
    <>
      {/* Scoped styles — injected once per component instance */}
      <style>{STEAM_CSS}</style>

      <div
        className={`relative inline-block ${className}`}
        aria-hidden="true"
        role="presentation"
      >
        {/* Three steam wisps */}
        <span className="steam-wisp" />
        <span className="steam-wisp" />
        <span className="steam-wisp" />
      </div>
    </>
  )
}
