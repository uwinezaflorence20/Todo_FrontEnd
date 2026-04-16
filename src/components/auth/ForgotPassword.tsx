import React, { useState } from 'react';
import { useToast } from '../ui/Toast';
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

const BASE_URL = import.meta.env.PROD
  ? 'https://backend-todo-list-8tnv.onrender.com'
  : '';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const { success, error: showError } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'accept': '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send reset link');
      }
      success('Reset Link Sent', `A recovery link has been sent to ${email}`);
      setIsSubmitted(true);
    } catch (err) {
      showError('Request Failed', err instanceof Error ? err.message : 'Could not send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-12 text-center animate-fade-in">
      <div className="absolute top-10 left-10 flex items-center gap-2 text-brand">
        <CheckCircle2 className="w-8 h-8 font-bold" />
        <span className="text-2xl font-bold tracking-wider">TICK.DO</span>
      </div>

      <h1 className="mb-3 text-5xl font-bold text-brand">Reset Password</h1>

      {isSubmitted ? (
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-green-50 border border-green-200 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-800">Check your inbox!</p>
              <p className="mt-2 text-base text-green-700 leading-relaxed">
                We've sent a reset link to<br />
                <span className="font-bold">{email}</span>
              </p>
            </div>
            <p className="text-sm text-gray-400">Didn't receive it? Check your spam folder.</p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95"
          >
            BACK TO SIGN IN
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
            <Mail className="w-7 h-7 text-brand" />
          </div>
          <p className="mb-8 text-lg text-gray-500 max-w-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                className={`w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg border-2 transition-all ${emailError ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-brand/30'}`}
              />
              {emailError && (
                <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-red-500">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {emailError}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="block w-full font-bold text-brand hover:underline transition-all"
            >
              Back to Sign In
            </button>
          </form>
        </>
      )}
    </div>
  );
};
