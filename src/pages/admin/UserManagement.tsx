import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Loader2, Users, Check, X, Pencil, Trash2 } from 'lucide-react';
import { userApi, type ApiUser, type UpdateUserPayload } from '../../services/api';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inline edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user: ApiUser) => {
    setEditingId(user.id);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: number) => {
    setSaving(true);
    try {
      const payload: UpdateUserPayload = {
        username: editUsername,
        email: editEmail,
        role: editRole,
      };
      const updated = await userApi.update(id, payload);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      setEditingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setDeletingId(id);
    try {
      await userApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="flex flex-col gap-6 h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              <p className="text-sm text-gray-500 font-medium tracking-wide">Manage platform roles and accounts</p>
            </div>
          </div>
          <button
            onClick={fetchUsers}
            className="bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            Refresh
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden flex flex-col relative">

          {loading ? (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
              <Loader2 className="w-12 h-12 text-brand animate-spin" />
              <p className="text-gray-500 font-semibold animate-pulse">Fetching users from server...</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 z-10 bg-red-50/90 backdrop-blur-sm flex items-center justify-center flex-col pb-10">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border-2 border-red-100">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h3>
                <p className="text-gray-600 mb-6 font-medium">{error}</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors"
                >
                  Return to Login
                </button>
              </div>
            </div>
          ) : null}

          {/* Data Table */}
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full text-sm text-left align-middle border-collapse">
              <thead>
                <tr className="border-b border-gray-100/50 bg-gray-50/50 text-gray-500">
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">ID</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Username</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Email</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Role</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-400">#{user.id}</td>

                    {/* Username cell */}
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {editingId === user.id ? (
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 w-36"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-brand to-emerald-300 text-white flex items-center justify-center font-bold shadow-sm">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          {user.username}
                        </div>
                      )}
                    </td>

                    {/* Email cell */}
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {editingId === user.id ? (
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 w-48"
                        />
                      ) : (
                        user.email
                      )}
                    </td>

                    {/* Role cell */}
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : 'bg-green-100 text-brand border border-green-200'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </td>

                    {/* Actions cell */}
                    <td className="px-6 py-4 text-right">
                      {editingId === user.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => saveEdit(user.id)}
                            disabled={saving}
                            className="flex items-center gap-1 text-white bg-brand hover:bg-brand-dark font-bold text-xs px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                          >
                            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center gap-1 text-gray-500 bg-gray-100 hover:bg-gray-200 font-bold text-xs px-3 py-1.5 rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="flex items-center gap-1 text-brand hover:text-brand-dark font-bold text-xs bg-brand/10 hover:bg-brand/20 px-3 py-1.5 rounded transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={deletingId === user.id}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                          >
                            {deletingId === user.id
                              ? <Loader2 className="w-3 h-3 animate-spin" />
                              : <Trash2 className="w-3 h-3" />}
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {(!users || users.length === 0) && !loading && !error && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                      No users found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
