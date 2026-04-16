import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { ForgotPassword } from './ForgotPassword';
import { useToast } from '../ui/Toast';
import { useAuth } from '../../context/AuthContext';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.319 0-13.824 3.931-17.694 9.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.993 39.303 16.546 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

export const AuthContainer: React.FC = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Signup form state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupFieldErrors, setSignupFieldErrors] = useState<Record<string, string>>({});

  // Signin form state
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinError, setSigninError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showSigninPassword, setShowSigninPassword] = useState(false);

  const validateSignup = () => {
    const errors: Record<string, string> = {};
    if (!signupUsername.trim()) errors.username = 'Username is required';
    else if (signupUsername.length < 3) errors.username = 'Username must be at least 3 characters';
    if (!signupEmail.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) errors.email = 'Enter a valid email address';
    if (!signupPassword) errors.password = 'Password is required';
    else if (signupPassword.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
    if (!pw) return { label: '', color: '', width: '0%' };
    if (pw.length < 6) return { label: 'Weak', color: 'bg-red-400', width: '25%' };
    if (pw.length < 10 && !/[A-Z]/.test(pw)) return { label: 'Fair', color: 'bg-yellow-400', width: '50%' };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 8) return { label: 'Strong', color: 'bg-green-400', width: '100%' };
    return { label: 'Good', color: 'bg-blue-400', width: '75%' };
  };

  const pwStrength = getPasswordStrength(signupPassword);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setSignupError(null);
    setSigninError(null);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsForgotPassword(true);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    const fieldErrors = validateSignup();
    if (Object.keys(fieldErrors).length > 0) {
      setSignupFieldErrors(fieldErrors);
      return;
    }
    setSignupFieldErrors({});
    setIsSigningUp(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
          role: "USER"
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Signup failed');
      }

      // Automatically switch to sign in view on success
      success('Account Created', 'Your account has been created successfully. Please sign in.');
      toggleForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setSignupError(errorMessage);
      error('Signup Failed', errorMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError(null);
    setIsSigningIn(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signinEmail,
          password: signinPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Signin failed');
      }

      // Handle successful sign in
      const data = await response.json();
      console.log('Signin successful', data);
      
      const token = data.token || data.accessToken || data.jwt || data.id_token;
      if (token) {
        login(token, {
          id: data.id,
          email: signinEmail,
          name: data.username || signinEmail.split('@')[0],
          role: data.role || (signinEmail === 'admin@gmail.com' ? 'ADMIN' : 'USER')
        });
      }
      
      success('Welcome Back!', 'You have successfully signed in.');

      // Navigate based on role or default to admin dashboard for demonstration purposes
      if (data.role === 'ADMIN' || signinEmail === 'admin@gmail.com') {
        navigate('/admin/dashboard');
      } else {
        // Normal user dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setSigninError(errorMessage);
      error('Signin Failed', errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };


  return (
    <div className="auth-container font-sans">
      <div className={`auth-box ${isSignUp ? 'is-signup' : ''} ${isForgotPassword ? 'show-forgot-password' : ''}`}>
        
        {/* Sign Up Form Container */}
        <div className="form-container sign-up-container">
          <form action="#" className="flex h-full w-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={handleSignUp}>
            <div className="absolute top-10 left-10 flex items-center gap-2 text-brand">
              <CheckCircle className="w-8 h-8 font-bold" />
              <span className="text-2xl font-bold tracking-wider">TICK.DO</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold text-brand">Create Account</h1>
            <div className="mb-6 flex justify-center w-full max-w-sm">
              <button type="button" className="flex h-14 w-full items-center justify-center gap-4 rounded-full border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md">
                <GoogleIcon />
                <span className="text-lg font-semibold text-gray-700">Continue with Google</span>
              </button>
            </div>
            <p className="mb-6 text-base text-gray-400">or use your email for registration:</p>
            {signupError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {signupError}
              </div>
            )}
            <div className="w-full max-w-md space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={(e) => { setSignupUsername(e.target.value); setSignupFieldErrors(p => ({ ...p, username: '' })); }}
                  className={`w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg border-2 transition-all ${signupFieldErrors.username ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-brand/30'}`}
                />
                {signupFieldErrors.username && <p className="mt-1 ml-2 text-xs font-semibold text-red-500">{signupFieldErrors.username}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => { setSignupEmail(e.target.value); setSignupFieldErrors(p => ({ ...p, email: '' })); }}
                  className={`w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg border-2 transition-all ${signupFieldErrors.email ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-brand/30'}`}
                />
                {signupFieldErrors.email && <p className="mt-1 ml-2 text-xs font-semibold text-red-500">{signupFieldErrors.email}</p>}
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => { setSignupPassword(e.target.value); setSignupFieldErrors(p => ({ ...p, password: '' })); }}
                    className={`w-full rounded-xl bg-brand-light py-4 pl-6 pr-14 outline-none text-lg border-2 transition-all ${signupFieldErrors.password ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-brand/30'}`}
                  />
                  <button type="button" onClick={() => setShowSignupPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-colors">
                    {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signupFieldErrors.password && <p className="mt-1 ml-2 text-xs font-semibold text-red-500">{signupFieldErrors.password}</p>}
                {signupPassword && (
                  <div className="mt-2 px-1">
                    <div className="h-1.5 w-full rounded-full bg-gray-200">
                      <div className={`h-full rounded-full transition-all duration-300 ${pwStrength.color}`} style={{ width: pwStrength.width }} />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gray-400">{pwStrength.label} password</p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSigningUp}
                className="mt-4 w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSigningUp && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSigningUp ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
            </div>
            <button type="button" onClick={toggleForm} className="mobile-toggle mt-8 font-bold text-brand md:hidden">
              Already have an account? Sign In
            </button>
          </form>
        </div>

        {/* Sign In / Forgot Password Container */}
        <div className="form-container sign-in-container">
          {isForgotPassword ? (
            <ForgotPassword onBack={() => setIsForgotPassword(false)} />
          ) : (
            <form action="#" className="flex h-full w-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={handleSignIn}>
              <div className="absolute top-10 left-10 flex items-center gap-2 text-brand">
                <CheckCircle className="w-8 h-8 font-bold" />
                <span className="text-2xl font-bold tracking-wider">TICK.DO</span>
              </div>

              <h1 className="mb-6 text-5xl font-bold text-brand">Sign in</h1>
              <div className="mb-6 flex justify-center w-full max-w-sm">
                <button type="button" className="flex h-14 w-full items-center justify-center gap-4 rounded-full border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md">
                  <GoogleIcon />
                  <span className="text-lg font-semibold text-gray-700">Continue with Google</span>
                </button>
              </div>
              <p className="mb-6 text-base text-gray-400">or use your email account:</p>
              {signinError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {signinError}
                </div>
              )}
              <div className="w-full max-w-md space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg border-2 border-transparent focus:border-brand/30 transition-all"
                />
                <div className="relative">
                  <input
                    type={showSigninPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    required
                    className="w-full rounded-xl bg-brand-light py-4 pl-6 pr-14 outline-none text-lg border-2 border-transparent focus:border-brand/30 transition-all"
                  />
                  <button type="button" onClick={() => setShowSigninPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-colors">
                    {showSigninPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-sm text-gray-500 underline decoration-gray-300 decoration-2 transition-colors hover:text-brand"
                  >
                    Forgot your password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="mt-6 w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSigningIn && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isSigningIn ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </div>
              <button type="button" onClick={toggleForm} className="mobile-toggle mt-8 font-bold text-brand md:hidden">
                Don&apos;t have an account? Sign Up
              </button>
            </form>
          )}
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay - Welcome Back */}
            <div className="overlay-panel overlay-left">
              <div className="geometric-bg">
                <div className="triangle triangle-1"></div>
                <div className="triangle triangle-2"></div>
                <div className="square-1"></div>
              </div>
              <div className="relative z-10">
                <h1 className="mb-6 text-5xl font-bold text-white">Welcome Back!</h1>
                <p className="mb-10 text-xl text-white opacity-90 leading-relaxed px-12">To keep connected with us please login with your personal info</p>
                <button type="button" onClick={toggleForm} className="w-56 rounded-full border-2 border-white py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-brand hover:scale-105 active:scale-95">
                  SIGN IN
                </button>
              </div>
            </div>
            {/* Right Overlay - Hello Friend */}
            <div className="overlay-panel overlay-right">
              <div className="geometric-bg">
                <div className="triangle triangle-1"></div>
                <div className="circle-1"></div>
              </div>
              <div className="relative z-10">
                <h1 className="mb-6 text-5xl font-bold text-white">Hello, Friend!</h1>
                <p className="mb-10 text-xl text-white opacity-90 leading-relaxed px-12">Enter your personal details and start journey with us</p>
                <button type="button" onClick={toggleForm} className="w-56 rounded-full border-2 border-white py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-brand hover:scale-105 active:scale-95">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
