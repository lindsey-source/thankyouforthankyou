import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const FALLBACK_KEY = 'pk_test_YmlnLWFwaGlkLTg1LmNsZXJrLmFjY291bnRzLmRldiQ'
const RAW_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || FALLBACK_KEY
const AFTER_SIGN_IN_URL = import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL?.trim() || '/dashboard'
const AFTER_SIGN_UP_URL = import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL?.trim() || '/dashboard'
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
      clerkJSVersion="5.35.0"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl={AFTER_SIGN_IN_URL}
      afterSignUpUrl={AFTER_SIGN_UP_URL}
      allowedRedirectOrigins={['https://thankyouforthankyou.lovable.app']}
      signInForceRedirectUrl={AFTER_SIGN_IN_URL}
      signUpForceRedirectUrl={AFTER_SIGN_UP_URL}
      signInFallbackRedirectUrl={AFTER_SIGN_IN_URL}
      signUpFallbackRedirectUrl={AFTER_SIGN_UP_URL}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
