import React, { useState } from 'react';

export const AuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="h-screen w-full overflow-hidden font-sans">
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form action="#" className="relative flex h-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute top-10 left-10 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand p-1">
                <svg viewBox="0 0 24 24" className="fill-brand h-6 w-6">
                  <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Diprella</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold text-brand">Create Account</h1>
            <div className="mb-6 flex justify-center gap-4">
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">f</span>
              </button>
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">G+</span>
              </button>
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">in</span>
              </button>
            </div>
            <p className="mb-6 text-base text-gray-400">or use your email for registration:</p>
            <div className="w-full max-w-md space-y-4">
              <input type="text" placeholder="Name" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="email" placeholder="Email" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="password" placeholder="Password" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <button type="submit" className="mt-6 w-56 rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95">
                SIGN UP
              </button>
            </div>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form action="#" className="relative flex h-full flex-col items-center justify-center bg-white p-12 text-center" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute top-10 left-10 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand p-1">
                <svg viewBox="0 0 24 24" className="fill-brand h-6 w-6">
                  <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Diprella</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold text-brand">Sign in to Diprella</h1>
            <div className="mb-6 flex justify-center gap-4">
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">f</span>
              </button>
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">G+</span>
              </button>
              <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50">
                <span className="text-xl font-bold text-gray-600">in</span>
              </button>
            </div>
            <p className="mb-6 text-base text-gray-400">or use your email account:</p>
            <div className="w-full max-w-md space-y-4">
              <input type="email" placeholder="Email" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <input type="password" placeholder="Password" className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg" />
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-gray-600 underline decoration-gray-300 decoration-2 transition-colors hover:text-brand">Forgot your password?</a>
              </div>
              <button type="submit" className="mt-8 w-56 rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95">
                SIGN IN
              </button>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay - Welcome Back */}
            <div className="overlay-panel overlay-left geometric-bg">
              <div className="triangle triangle-1"></div>
              <div className="triangle triangle-2"></div>
              <div className="square square-1"></div>
              <div className="relative z-10 p-12">
                <h1 className="mb-6 text-5xl font-bold">Welcome Back!</h1>
                <p className="mb-10 text-xl opacity-90 leading-relaxed">To keep connected with us please login with your personal info</p>
                <button type="button" onClick={toggleForm} className="w-56 rounded-full border-2 border-white py-4 text-lg font-bold transition-all hover:bg-white hover:text-brand hover:scale-105 active:scale-95">
                  SIGN IN
                </button>
              </div>
            </div>
            {/* Right Overlay - Hello Friend */}
            <div className="overlay-panel overlay-right geometric-bg">
              <div className="triangle triangle-1"></div>
              <div className="circle circle-1"></div>
              <div className="relative z-10 p-12">
                <h1 className="mb-6 text-5xl font-bold">Hello, Friend!</h1>
                <p className="mb-10 text-xl opacity-90 leading-relaxed">Enter your personal details and start journey with us</p>
                <button type="button" onClick={toggleForm} className="w-56 rounded-full border-2 border-white py-4 text-lg font-bold transition-all hover:bg-white hover:text-brand hover:scale-105 active:scale-95">
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
