---
name: Auth System
description: Supabase Auth (email/password) with auto-confirm, /login & /signup routes
type: feature
---
- Provider: Supabase Auth (email/password). Clerk has been fully removed.
- Auto-confirm signups is ON — users sign in immediately, no email verification.
- Routes: /login (Sign In), /signup (Sign Up). Legacy /sign-in and /sign-up redirect.
- AuthContext at src/contexts/AuthContext.tsx exposes { user, session, userId, isLoaded, isSignedIn, signOut }.
- ProtectedRoute redirects unauthenticated users to /login.
- handle_new_user trigger inserts a profile row on auth.users insert (uses raw_user_meta_data->>'name').
- After sign-in/sign-up, navigate to /dashboard.
