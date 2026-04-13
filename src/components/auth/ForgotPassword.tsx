import React, { useState } from 'react';
import { useToast } from '../ui/Toast';
import { Loader2 } from 'lucide-react';

const BASE_URL = 'https://backend-todo-list-8tnv.onrender.com';

interface ForgotPasswordProps {
  onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const { success, error: showError } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="absolute top-10 left-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand p-1">
          <svg viewBox="0 0 24 24" className="fill-brand h-6 w-6">
            <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-800">Tick</span>
      </div>

      <h1 className="mb-6 text-5xl font-bold text-brand">Reset Password</h1>

      {isSubmitted ? (
        <div className="w-full max-w-md space-y-6">
          <div className="rounded-xl bg-green-50 p-6 border border-green-100">
            <p className="text-lg text-green-800 font-medium leading-relaxed">
              We've sent a password reset link to <span className="font-bold underline">{email}</span>.
              Please check your inbox.
            </p>
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
          <p className="mb-8 text-lg text-gray-500 max-w-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-brand-light py-4 px-6 outline-none text-lg border-2 border-transparent focus:border-brand/30 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-full bg-brand py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 block w-full font-bold text-brand hover:underline transition-all"
            >
              Back to Sign In
            </button>
          </form>
        </>
      )}
    </div>
  );
};
