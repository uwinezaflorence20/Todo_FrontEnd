import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Task, CreateTaskPayload, TaskStatus } from '../../services/api';

interface TaskModalProps {
  task?: Task | null;
  onClose: () => void;
  onSubmit: (payload: CreateTaskPayload) => Promise<void>;
}

const CATEGORIES = ['Work', 'Personal', 'Health', 'Finance', 'Education', 'Other'];
const STATUSES: TaskStatus[] = ['Pending', 'Doing', 'Done'];

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSubmit }) => {
  const isEdit = !!task;

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [category, setCategory] = useState(task?.category ?? 'Work');
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'Pending');
  const [progress, setProgress] = useState(task?.progress ?? 0);
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // sync progress with status
  useEffect(() => {
    if (status === 'Done') setProgress(100);
    else if (status === 'Pending' && progress === 100) setProgress(0);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), description, category, status, progress, dueDate });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-800">
            {isEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-sm font-bold text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              required
              className="w-full rounded-xl bg-gray-50 py-3 px-4 text-gray-800 font-medium outline-none border-2 border-transparent focus:border-brand/30 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
              className="w-full rounded-xl bg-gray-50 py-3 px-4 text-gray-800 font-medium outline-none border-2 border-transparent focus:border-brand/30 transition-all resize-none"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-gray-50 py-3 px-4 text-gray-800 font-medium outline-none border-2 border-transparent focus:border-brand/30 transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl bg-gray-50 py-3 px-4 text-gray-800 font-medium outline-none border-2 border-transparent focus:border-brand/30 transition-all"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
              Progress: <span className="text-brand">{progress}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-brand"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl bg-gray-50 py-3 px-4 text-gray-800 font-medium outline-none border-2 border-transparent focus:border-brand/30 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
