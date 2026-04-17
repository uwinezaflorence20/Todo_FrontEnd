import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, Calendar } from 'lucide-react';
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
  const [titleError, setTitleError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const dueDatePast = dueDate && dueDate < today && status !== 'Done';

  const progressColor =
    progress === 100 ? 'bg-green-400' :
    progress >= 60 ? 'bg-blue-400' :
    progress >= 30 ? 'bg-yellow-400' : 'bg-red-400';

  // sync progress with status
  useEffect(() => {
    if (status === 'Done') setProgress(100);
    else if (status === 'Pending' && progress === 100) setProgress(0);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setTitleError('Title is required.'); return; }
    if (title.trim().length > 100) { setTitleError('Title must be 100 characters or fewer.'); return; }
    setTitleError('');
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
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
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
            <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider">Title *</label>
              <span className={`text-[10px] font-bold ${title.length > 90 ? 'text-red-400' : 'text-gray-300'}`}>{title.length}/100</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setTitleError(''); }}
              placeholder="Task title..."
              maxLength={100}
              className={`w-full rounded-xl py-3 px-4 text-gray-800 font-medium outline-none border-2 transition-all ${titleError ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-transparent focus:border-brand/30'}`}
            />
            {titleError && <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500"><AlertCircle className="w-3.5 h-3.5" />{titleError}</p>}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider">Description</label>
              <span className="text-[10px] font-bold text-gray-300">{description.length} chars</span>
            </div>
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
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Category</label>
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
              <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Status</label>
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
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider">Progress</label>
              <span className={`text-sm font-black ${progress === 100 ? 'text-green-500' : 'text-brand'}`}>{progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              disabled={status === 'Done'}
              className="w-full accent-brand disabled:opacity-50"
            />
            <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
              <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Due Date</label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full rounded-xl py-3 pl-4 pr-10 text-gray-800 font-medium outline-none border-2 transition-all ${dueDatePast ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-transparent focus:border-brand/30'}`}
              />
              <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${dueDatePast ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            {dueDatePast && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-500">
                <AlertCircle className="w-3.5 h-3.5" />
                This date is in the past.
              </p>
            )}
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
