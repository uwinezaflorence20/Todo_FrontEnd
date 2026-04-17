import React, { useState } from 'react';
import { Clock, MoreVertical, Edit2, Trash2, CheckCircle, RotateCcw, PlayCircle, AlertTriangle, X } from 'lucide-react';
import type { Task, TaskStatus } from '../../services/api';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  Pending: 'bg-amber-100 text-amber-600',
  Doing: 'bg-blue-100 text-blue-600',
  Done: 'bg-green-100 text-brand',
};

const CATEGORY_COLORS: Record<string, string> = {
  Work: '#3b82f6',
  Personal: '#ec4899',
  Health: '#06b6d4',
  Finance: '#f97316',
  Education: '#8b5cf6',
  Other: '#0ec277',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#0ec277';
}

function formatDueDate(dueDate?: string): { text: string; urgent: boolean; overdue: boolean } {
  if (!dueDate) return { text: 'No deadline', urgent: false, overdue: false };
  const d = new Date(dueDate);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return { text: 'Overdue', urgent: true, overdue: true };
  if (days === 0) return { text: 'Due today', urgent: true, overdue: false };
  if (days === 1) return { text: '1 day left', urgent: true, overdue: false };
  if (days < 7) return { text: `${days} days left`, urgent: false, overdue: false };
  if (days < 14) return { text: '1 week left', urgent: false, overdue: false };
  return { text: `${Math.ceil(days / 7)} weeks left`, urgent: false, overdue: false };
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const bgColor = getCategoryColor(task.category);
  const due = formatDueDate(task.dueDate);

  const handleDelete = async () => {
    setDeleting(true);
    setConfirmDelete(false);
    setMenuOpen(false);
    onDelete(task.id);
  };

  const nextStatus = (): { label: string; status: TaskStatus; Icon: React.FC<{ className?: string }> } | null => {
    if (task.status === 'Pending') return { label: 'Start', status: 'Doing', Icon: PlayCircle };
    if (task.status === 'Doing') return { label: 'Complete', status: 'Done', Icon: CheckCircle };
    return { label: 'Reopen', status: 'Pending', Icon: RotateCcw };
  };

  const next = nextStatus();

  return (
    <div
      className={`bg-white p-7 rounded-4xl shadow-xl shadow-gray-200/50 border transition-all duration-300 hover:-translate-y-1 overflow-hidden group relative ${
        deleting ? 'opacity-50 pointer-events-none' : ''
      } ${due.overdue && task.status !== 'Done' ? 'border-red-100 hover:border-red-200' : 'border-transparent hover:border-brand/10'}`}
    >
      {/* Status badge */}
      <div className="absolute top-5 left-7">
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${STATUS_COLORS[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Menu button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded-xl text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[140px]">
            <button
              onClick={() => { setMenuOpen(false); onEdit(task); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-400" />
              Edit
            </button>
            {next && (
              <button
                onClick={() => { setMenuOpen(false); onStatusChange(task.id, next.status); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <next.Icon className="w-4 h-4 text-brand" />
                {next.label}
              </button>
            )}
            <div className="h-px bg-gray-100 mx-2 my-1" />
            <button
              onClick={() => { setMenuOpen(false); setConfirmDelete(true); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Backdrop click to close menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
      )}

      {/* Delete confirmation overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 rounded-4xl p-6 text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="font-black text-gray-800 text-base">Delete this task?</p>
            <p className="text-xs text-gray-400 font-medium mt-1">This cannot be undone.</p>
          </div>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Icon and Content */}
      <div className="flex flex-col mt-8 mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white text-xl font-black"
          style={{ backgroundColor: bgColor }}
        >
          {task.title.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-lg font-black text-gray-800 mb-1 group-hover:text-brand transition-colors leading-snug">
          {task.title}
        </h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{task.category}</p>
        {task.description && (
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 font-medium leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Due date */}
      <div className={`flex items-center gap-2 mb-6 font-bold text-xs ${
        task.status !== 'Done' && due.overdue ? 'text-red-500' :
        task.status !== 'Done' && due.urgent ? 'text-amber-500' : 'text-gray-400'
      }`}>
        {due.overdue && task.status !== 'Done' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
        <span>{due.text}</span>
      </div>

      {/* Progress */}
      <div className="pt-4 border-t border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Progress</span>
          <span className="text-sm font-black text-gray-800">{task.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-700"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Quick status change */}
      {next && (
        <button
          onClick={() => onStatusChange(task.id, next.status)}
          className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-brand bg-brand/5 hover:bg-brand/10 transition-all flex items-center justify-center gap-1.5"
        >
          <next.Icon className="w-3.5 h-3.5" />
          {next.label}
        </button>
      )}
    </div>
  );
};
