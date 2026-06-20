/**
 * Re-exports Framer Motion's `useReducedMotion` as the project-level hook.
 *
 * Using this thin wrapper means the rest of the codebase imports from
 * `@/hooks/useReducedMotion` rather than directly from `framer-motion`,
 * making it easy to swap the underlying implementation without touching
 * every consumer.
 */
export { useReducedMotion } from 'framer-motion';
