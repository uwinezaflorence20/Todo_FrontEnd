import React, { useState } from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { userApi } from '../../services/api';
import { User, Mail, Shield, Pencil, Check, X, Loader2, KeyRound, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { success, error: showError } = useToast();

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(user?.name || '');
  const [emailVal, setEmailVal] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const [pwSection, setPwSection] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [savingPw, setSavingPw] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  const getPasswordStrength = (pw: string) => {
    if (!pw) return null;
    if (pw.length < 6) return { label: 'Weak', color: 'bg-red-400', width: '25%' };
    if (pw.length < 10 && !/[A-Z]/.test(pw)) return { label: 'Fair', color: 'bg-yellow-400', width: '50%' };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 8) return { label: 'Strong', color: 'bg-green-400', width: '100%' };
    return { label: 'Good', color: 'bg-blue-400', width: '75%' };
  };

  const pwStrength = getPasswordStrength(newPw);

  const handleSaveProfile = async () => {
    if (!user?.id) {
      showError('Update Failed', 'User ID not found. Please sign out and sign back in.');
      return;
    }
    setSaving(true);
    try {
      const updated = await userApi.update(user.id, { username: nameVal, email: emailVal });
      updateProfile({ name: updated.username, email: updated.email });
      success('Profile Updated', 'Your profile has been saved.');
      setEditing(false);
    } catch (err) {
      showError('Update Failed', err instanceof Error ? err.message : 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setNameVal(user?.name || '');
    setEmailVal(user?.email || '');
    setEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!currentPw) errors.currentPw = 'Current password is required.';
    if (!newPw) errors.newPw = 'New password is required.';
    else if (newPw.length < 6) errors.newPw = 'Password must be at least 6 characters.';
    if (!confirmPw) errors.confirmPw = 'Please confirm your new password.';
    else if (newPw !== confirmPw) errors.confirmPw = 'Passwords do not match.';
    if (Object.keys(errors).length > 0) { setPwErrors(errors); return; }
    setPwErrors({});
    setSavingPw(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to change password');
      }
      success('Password Changed', 'Your password has been updated.');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setPwSection(false);
    } catch (err) {
      showError('Change Failed', err instanceof Error ? err.message : 'Could not change password.');
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <UserLayout sidebar={<UserSidebar />} topbar={<UserTopbar />}>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Avatar card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex items-center gap-6">
          <div className="w-28 h-28 rounded-3xl bg-brand/10 flex items-center justify-center text-brand font-black text-5xl shadow-inner shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">{displayName}</h1>
            <p className="text-base text-gray-400 font-semibold mt-1">{user?.email}</p>
            <span className={`mt-3 inline-block px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-wider ${
              user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-brand/10 text-brand'
            }`}>
              {user?.role === 'ADMIN' ? 'Administrator' : 'User'}
            </span>
          </div>
        </div>

        {/* Info & Edit card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-xl font-black text-gray-800">Profile Information</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand/10 text-brand text-base font-bold hover:bg-brand/20 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-base font-bold hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-base font-bold hover:bg-brand-dark transition-colors disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-wider">
                <User className="w-4 h-4" />
                Username
              </label>
              {editing ? (
                <input
                  type="text"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  className="px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all"
                />
              ) : (
                <p className="px-5 py-3.5 rounded-xl bg-gray-50 text-base font-semibold text-gray-800">{displayName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  className="px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all"
                />
              ) : (
                <p className="px-5 py-3.5 rounded-xl bg-gray-50 text-base font-semibold text-gray-800">{user?.email}</p>
              )}
            </div>

            {/* Role (read-only) */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                Role
              </label>
              <p className="px-5 py-3.5 rounded-xl bg-gray-50 text-base font-semibold text-gray-500">
                {user?.role === 'ADMIN' ? 'Administrator' : 'User'}
                <span className="ml-2 text-xs text-gray-400">(cannot be changed here)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Change Password card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-xl font-black text-gray-800">Change Password</h2>
            {!pwSection && (
              <button
                onClick={() => setPwSection(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-base font-bold hover:bg-gray-200 transition-colors"
              >
                <KeyRound className="w-4 h-4" />
                Change
              </button>
            )}
          </div>

          {!pwSection ? (
            <p className="text-base text-gray-400 font-medium">
              Click "Change" to update your password.
            </p>
          ) : (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              {/* Current Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPw}
                    onChange={(e) => { setCurrentPw(e.target.value); setPwErrors(p => ({ ...p, currentPw: '' })); }}
                    className={`w-full pl-5 pr-12 py-3.5 rounded-xl border text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 transition-all ${pwErrors.currentPw ? 'bg-red-50 border-red-300 focus:ring-red-100' : 'bg-gray-50 border-gray-200 focus:ring-brand/20 focus:border-brand/30'}`}
                  />
                  <button type="button" onClick={() => setShowCurrentPw(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-colors">
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwErrors.currentPw && <p className="flex items-center gap-1 text-xs font-semibold text-red-500"><AlertCircle className="w-3.5 h-3.5" />{pwErrors.currentPw}</p>}
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={newPw}
                    onChange={(e) => { setNewPw(e.target.value); setPwErrors(p => ({ ...p, newPw: '' })); }}
                    className={`w-full pl-5 pr-12 py-3.5 rounded-xl border text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 transition-all ${pwErrors.newPw ? 'bg-red-50 border-red-300 focus:ring-red-100' : 'bg-gray-50 border-gray-200 focus:ring-brand/20 focus:border-brand/30'}`}
                  />
                  <button type="button" onClick={() => setShowNewPw(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-colors">
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwErrors.newPw && <p className="flex items-center gap-1 text-xs font-semibold text-red-500"><AlertCircle className="w-3.5 h-3.5" />{pwErrors.newPw}</p>}
                {newPw && pwStrength && (
                  <div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200">
                      <div className={`h-full rounded-full transition-all duration-300 ${pwStrength.color}`} style={{ width: pwStrength.width }} />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gray-400">{pwStrength.label} password</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    value={confirmPw}
                    onChange={(e) => { setConfirmPw(e.target.value); setPwErrors(p => ({ ...p, confirmPw: '' })); }}
                    className={`w-full pl-5 pr-12 py-3.5 rounded-xl border text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 transition-all ${pwErrors.confirmPw ? 'bg-red-50 border-red-300 focus:ring-red-100' : confirmPw && confirmPw === newPw ? 'bg-green-50 border-green-300 focus:ring-green-100' : 'bg-gray-50 border-gray-200 focus:ring-brand/20 focus:border-brand/30'}`}
                  />
                  <button type="button" onClick={() => setShowConfirmPw(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-colors">
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwErrors.confirmPw && <p className="flex items-center gap-1 text-xs font-semibold text-red-500"><AlertCircle className="w-3.5 h-3.5" />{pwErrors.confirmPw}</p>}
                {confirmPw && confirmPw === newPw && !pwErrors.confirmPw && (
                  <p className="flex items-center gap-1 text-xs font-semibold text-green-500"><Check className="w-3.5 h-3.5" />Passwords match</p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setPwSection(false); setCurrentPw(''); setNewPw(''); setConfirmPw(''); setPwErrors({}); }}
                  className="flex-1 py-3.5 rounded-xl bg-gray-100 text-gray-500 text-base font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPw}
                  className="flex-1 py-3.5 rounded-xl bg-brand text-white text-base font-bold hover:bg-brand-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {savingPw && <Loader2 className="w-4 h-4 animate-spin" />}
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </UserLayout>
  );
};
