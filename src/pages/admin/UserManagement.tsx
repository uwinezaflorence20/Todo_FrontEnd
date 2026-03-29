import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Loader2, Users } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found. Please sign in again.');
        }

        const response = await fetch('https://backend-todo-list-8tnv.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
             throw new Error('Unauthorized or Session expired. Please sign in again.');
          }
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="flex flex-col gap-6 h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0ec277]/10 flex items-center justify-center text-[#0ec277]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              <p className="text-sm text-gray-500 font-medium tracking-wide">Manage platform roles and accounts</p>
            </div>
          </div>
          <button className="bg-[#0ec277] hover:bg-[#399b8b] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
            Add New User
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white rounded-[1.5rem] shadow-sm border border-gray-100/50 overflow-hidden flex flex-col relative">
          
          {loading ? (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
               <Loader2 className="w-12 h-12 text-[#0ec277] animate-spin" />
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
                    <td className="px-6 py-4 font-bold text-gray-800">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0ec277] to-emerald-300 text-white flex items-center justify-center font-bold shadow-sm">
                            {user.username.charAt(0).toUpperCase()}
                         </div>
                         {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : 'bg-green-100 text-[#0ec277] border border-green-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0ec277] hover:text-[#399b8b] font-bold text-xs bg-[#0ec277]/10 hover:bg-[#0ec277]/20 px-3 py-1.5 rounded transition-colors mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-600 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors">
                        Delete
                      </button>
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
