import React, { useState } from 'react';

export const AuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.319 0-13.824 3.931-17.694 9.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.993 39.303 16.546 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );

  return (
    <div className="auth-container font-sans">
      <div className={`auth-box ${isSignUp ? 'is-signup' : ''}`}>
        
        {/* Sign Up Form Container */}
        <div className="form-container sign-up-container">
          <form action="#" className="flex h-full w-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute top-10 left-10 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand p-1">
                <svg viewBox="0 0 24 24" className="fill-brand h-6 w-6">
                  <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Tick</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold text-brand">Create Account</h1>
            <div className="mb-6 flex justify-center w-full max-w-sm">
              <button type="button" className="flex h-14 w-full items-center justify-center gap-4 rounded-full border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md">
                <GoogleIcon />
                <span className="text-lg font-semibold text-gray-700">Continue with Google</span>
              </button>
            </div>
            <p className="mb-6 text-base text-gray-400">or use your email for registration:</p>
            <div className="w-full max-w-md space-y-4">
              <input type="text" placeholder="Name" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="email" placeholder="Email" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="password" placeholder="Password" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <button type="submit" className="mt-6 w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95">
                SIGN UP
              </button>
            </div>
            <button type="button" onClick={toggleForm} className="mobile-toggle mt-8 font-bold text-brand md:hidden">
              Already have an account? Sign In
            </button>
          </form>
        </div>

        {/* Sign In Form Container */}
        <div className="form-container sign-in-container">
          <form action="#" className="flex h-full w-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute top-10 left-10 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand p-1">
                <svg viewBox="0 0 24 24" className="fill-brand h-6 w-6">
                  <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Tick</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold text-brand">Sign in</h1>
            <div className="mb-6 flex justify-center w-full max-w-sm">
              <button type="button" className="flex h-14 w-full items-center justify-center gap-4 rounded-full border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md">
                <GoogleIcon />
                <span className="text-lg font-semibold text-gray-700">Continue with Google</span>
              </button>
            </div>
            <p className="mb-6 text-base text-gray-400">or use your email account:</p>
            <div className="w-full max-w-md space-y-4">
              <input type="email" placeholder="Email" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="password" placeholder="Password" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-gray-600 underline decoration-gray-300 decoration-2 transition-colors hover:text-brand">Forgot your password?</a>
              </div>
              <button type="submit" className="mt-8 w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95">
                SIGN IN
              </button>
            </div>
            <button type="button" onClick={toggleForm} className="mobile-toggle mt-8 font-bold text-brand md:hidden">
              Don't have an account? Sign Up
            </button>
          </form>
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
