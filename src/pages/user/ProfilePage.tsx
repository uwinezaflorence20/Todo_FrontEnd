import React, { useState } from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { userApi } from '../../services/api';
import { User, Mail, Shield, Pencil, Check, X, Loader2, KeyRound } from 'lucide-react';

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
    if (newPw !== confirmPw) {
      showError('Password Mismatch', 'New password and confirmation do not match.');
      return;
    }
    if (newPw.length < 6) {
      showError('Too Short', 'Password must be at least 6 characters.');
      return;
    }
    setSavingPw(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://backend-todo-list-8tnv.onrender.com/api/auth/change-password', {
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
          <div className="w-28 h-28 rounded-3xl bg-brand/10 flex items-center justify-center text-brand font-black text-5xl shadow-inner flex-shrink-0">
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
            <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  required
                  className="px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  className="px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                  className="px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setPwSection(false); setCurrentPw(''); setNewPw(''); setConfirmPw(''); }}
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
