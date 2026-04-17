import React, { useState, useEffect, useMemo } from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { useTasks } from '../../context/TaskContext';
import { useToast } from '../../components/ui/Toast';
import type { Task, TaskStatus, CreateTaskPayload } from '../../services/api';
import { Grid, List, Loader2, Plus, Edit2, Trash2, Clock, AlertTriangle, AlertCircle, ClipboardList } from 'lucide-react';

type ViewMode = 'grid' | 'list';

const STATUS_FILTERS: ('All' | TaskStatus)[] = ['All', 'Pending', 'Doing', 'Done'];

export const UserDashboard: React.FC = () => {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const { success, error: showError } = useToast();

  const [activeFilter, setActiveFilter] = useState<'All' | TaskStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (activeFilter !== 'All') {
      list = list.filter((t) => t.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          (t.description ?? '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, activeFilter, searchQuery]);

  const counts = useMemo(() => ({
    All: tasks.length,
    Pending: tasks.filter((t) => t.status === 'Pending').length,
    Doing: tasks.filter((t) => t.status === 'Doing').length,
    Done: tasks.filter((t) => t.status === 'Done').length,
  }), [tasks]);

  const handleCreate = async (payload: CreateTaskPayload) => {
    await createTask(payload);
    success('Task Created', `"${payload.title}" has been added.`);
  };

  const handleEdit = async (payload: CreateTaskPayload) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, payload);
    success('Task Updated', `"${payload.title}" has been saved.`);
    setEditingTask(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      success('Task Deleted', 'The task has been removed.');
    } catch (err) {
      showError('Delete Failed', err instanceof Error ? err.message : 'Could not delete task.');
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      const progress = status === 'Done' ? 100 : status === 'Pending' ? 0 : undefined;
      await updateTask(id, { status, ...(progress !== undefined ? { progress } : {}) });
      success('Status Updated', `Task moved to ${status}.`);
    } catch (err) {
      showError('Update Failed', err instanceof Error ? err.message : 'Could not update task.');
    }
  };

  return (
    <UserLayout
      sidebar={<UserSidebar />}
      topbar={
        <UserTopbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddTask={() => { setEditingTask(null); setModalOpen(true); }}
        />
      }
    >
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Todo List</h1>
            <p className="text-gray-400 font-bold text-sm tracking-wide opacity-70">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl border transition-all ${
                viewMode === 'grid'
                  ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                  : 'bg-white border-gray-100 text-gray-400 hover:text-brand shadow-sm'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl border transition-all ${
                viewMode === 'list'
                  ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                  : 'bg-white border-gray-100 text-gray-400 hover:text-brand shadow-sm'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setEditingTask(null); setModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-3 bg-brand text-white font-bold text-sm rounded-xl shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${
                activeFilter === filter
                  ? 'bg-brand text-white shadow-xl shadow-brand/20'
                  : 'bg-white text-gray-400 hover:bg-gray-50 shadow-sm border border-transparent hover:border-gray-100'
              }`}
            >
              <span>{filter}</span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                activeFilter === filter ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
              }`}>
                {counts[filter]}
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
            <p className="text-gray-400 font-bold text-sm">Loading your tasks...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-6 text-center max-w-md flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-red-600 font-bold">{error}</p>
              <button
                onClick={fetchTasks}
                className="px-6 py-2.5 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-brand/10 flex items-center justify-center mb-2">
              <ClipboardList className="w-10 h-10 text-brand" />
            </div>
            <h3 className="text-xl font-black text-gray-700">
              {searchQuery ? 'No tasks match your search' : 'No tasks yet'}
            </h3>
            <p className="text-gray-400 font-medium text-sm max-w-xs">
              {searchQuery
                ? 'Try a different keyword or clear the search.'
                : 'Click "Add Task" to create your first task.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => { setEditingTask(null); setModalOpen(true); }}
                className="mt-2 px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 text-sm"
              >
                Add Your First Task
              </button>
            )}
          </div>
        )}

        {/* Task Grid or List */}
        {!loading && !error && filteredTasks.length > 0 && (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTasks.map((task) => (
                <ListTaskRow
                  key={task.id}
                  task={task}
                  onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => { setModalOpen(false); setEditingTask(null); }}
          onSubmit={editingTask ? handleEdit : handleCreate}
        />
      )}
    </UserLayout>
  );
};

// ─── List Row View ─────────────────────────────────────────────────────────────

interface ListRowProps {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  Pending: 'bg-amber-100 text-amber-600',
  Doing: 'bg-blue-100 text-blue-600',
  Done: 'bg-green-100 text-brand',
};

const ListTaskRow: React.FC<ListRowProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const nextStatus = task.status === 'Pending' ? 'Doing' : task.status === 'Doing' ? 'Done' : 'Pending';

  const getDueInfo = () => {
    if (!task.dueDate) return null;
    const days = Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / 86400000);
    if (days < 0) return { text: 'Overdue', cls: 'text-red-500' };
    if (days === 0) return { text: 'Due today', cls: 'text-amber-500' };
    if (days === 1) return { text: '1 day left', cls: 'text-amber-500' };
    return { text: `${days}d left`, cls: 'text-gray-400' };
  };
  const dueInfo = getDueInfo();
  const isOverdue = dueInfo?.cls === 'text-red-500' && task.status !== 'Done';

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-sm border px-6 py-4 flex items-center gap-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group ${isOverdue ? 'border-red-100' : 'border-gray-100'}`}>
        {/* Status dot */}
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${task.status === 'Done' ? 'bg-green-400' : task.status === 'Doing' ? 'bg-blue-400' : 'bg-amber-400'}`} />

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <p className={`font-black text-sm truncate transition-colors ${task.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-800 group-hover:text-brand'}`}>{task.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{task.category}</span>
            {dueInfo && (
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${dueInfo.cls}`}>
                {isOverdue ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {dueInfo.text}
              </span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 ${STATUS_COLORS[task.status]}`}>
          {task.status}
        </span>

        {/* Progress */}
        <div className="flex items-center gap-2 shrink-0 w-28">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${task.progress === 100 ? 'bg-green-400' : 'bg-brand'}`} style={{ width: `${task.progress}%` }} />
          </div>
          <span className="text-xs font-black text-gray-500 w-8 text-right">{task.progress}%</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onStatusChange(task.id, nextStatus as TaskStatus)}
            className="px-2.5 py-1.5 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-colors text-[10px] font-black"
            title={`Mark as ${nextStatus}`}
          >
            → {nextStatus}
          </button>
          <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setConfirmDelete(true)} className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setConfirmDelete(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="font-black text-gray-800">Delete "{task.title}"?</p>
              <p className="text-sm text-gray-400 mt-1">This cannot be undone.</p>
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors text-sm">Cancel</button>
              <button onClick={() => { setConfirmDelete(false); onDelete(task.id); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors text-sm flex items-center justify-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
