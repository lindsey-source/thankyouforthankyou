import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const FALLBACK_KEY = 'pk_test_YmlnLWFwaGlkLTg1LmNsZXJrLmFjY291bnRzLmRldiQ'
const RAW_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || FALLBACK_KEY
// Strip any accidental "VITE_CLERK_PUBLISHABLE_KEY=" prefix and surrounding quotes/whitespace
const PUBLISHABLE_KEY = String(RAW_KEY)
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/^VITE_CLERK_PUBLISHABLE_KEY\s*=\s*/, '')
  .trim() || FALLBACK_KEY

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
