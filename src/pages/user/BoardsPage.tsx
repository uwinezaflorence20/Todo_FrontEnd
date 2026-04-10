import React, { useEffect, useState } from 'react';
import { UserLayout } from './UserLayout';
import { UserSidebar } from './UserSidebar';
import { UserTopbar } from './UserTopbar';
import { TaskModal } from './TaskModal';
import { useTasks } from '../../context/TaskContext';
import { useToast } from '../../components/ui/Toast';
import type { Task, TaskStatus, CreateTaskPayload } from '../../services/api';
import { Plus, Loader2, GripVertical, Clock, Edit2, Trash2 } from 'lucide-react';

const COLUMNS: { status: TaskStatus; label: string; color: string; bg: string }[] = [
  { status: 'Pending', label: 'To Do', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  { status: 'Doing', label: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  { status: 'Done', label: 'Completed', color: 'text-brand', bg: 'bg-green-50 border-green-100' },
];

function formatDue(dueDate?: string): string {
  if (!dueDate) return '';
  const d = new Date(dueDate);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const BoardsPage: React.FC = () => {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const { success, error: showError } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('Pending');

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const byStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status);

  const handleCreate = async (payload: CreateTaskPayload) => {
    await createTask({ ...payload, status: defaultStatus });
    success('Task Created', `"${payload.title}" added to ${defaultStatus}.`);
  };

  const handleEdit = async (payload: CreateTaskPayload) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, payload);
    success('Task Updated', `"${payload.title}" saved.`);
    setEditingTask(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      success('Task Deleted', 'Task removed.');
    } catch (err) {
      showError('Delete Failed', err instanceof Error ? err.message : 'Could not delete.');
    }
  };

  const handleMove = async (id: number, status: TaskStatus) => {
    try {
      const progress = status === 'Done' ? 100 : status === 'Pending' ? 0 : undefined;
      await updateTask(id, { status, ...(progress !== undefined ? { progress } : {}) });
      success('Moved', `Task moved to ${status}.`);
    } catch (err) {
      showError('Move Failed', err instanceof Error ? err.message : 'Could not move task.');
    }
  };

  const openCreate = (status: TaskStatus) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setModalOpen(true);
  };

  return (
    <UserLayout sidebar={<UserSidebar />} topbar={<UserTopbar onAddTask={() => openCreate('Pending')} />}>
      <div className="flex flex-col gap-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Boards</h1>
            <p className="text-gray-400 text-sm font-bold mt-1">Drag tasks across columns to update status</p>
          </div>
          <button
            onClick={() => openCreate('Pending')}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white font-bold text-sm rounded-xl shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <p className="text-red-500 font-bold">{error}</p>
            <button onClick={fetchTasks} className="mt-3 px-4 py-2 bg-brand text-white font-bold rounded-xl text-sm hover:bg-brand-dark">
              Retry
            </button>
          </div>
        )}

        {/* Kanban Board */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {COLUMNS.map(({ status, label, color, bg }) => {
              const col = byStatus(status);
              return (
                <div key={status} className="flex flex-col gap-3">
                  {/* Column header */}
                  <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border ${bg}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        status === 'Pending' ? 'bg-amber-400' :
                        status === 'Doing' ? 'bg-blue-400' : 'bg-brand'
                      }`} />
                      <span className={`font-black text-sm ${color}`}>{label}</span>
                      <span className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-md ${bg} ${color}`}>
                        {col.length}
                      </span>
                    </div>
                    <button
                      onClick={() => openCreate(status)}
                      className={`p-1.5 rounded-lg hover:bg-white/60 transition-colors ${color}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-3 min-h-[200px]">
                    {col.map((task) => (
                      <KanbanCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
                        onDelete={handleDelete}
                        onMove={handleMove}
                        columns={COLUMNS}
                      />
                    ))}
                    {col.length === 0 && (
                      <button
                        onClick={() => openCreate(status)}
                        className="flex flex-col items-center justify-center gap-2 py-10 rounded-2xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-brand/30 hover:text-brand/40 transition-all"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-xs font-bold">Add a task</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
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

// ─── Kanban Card ───────────────────────────────────────────────────────────────

interface KanbanCardProps {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, status: TaskStatus) => void;
  columns: typeof COLUMNS;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onEdit, onDelete, onMove, columns }) => {
  const otherCols = columns.filter((c) => c.status !== task.status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-gray-300">
          <GripVertical className="w-4 h-4" />
        </div>
        <h4 className="flex-1 font-black text-gray-800 text-sm leading-snug group-hover:text-brand transition-colors">
          {task.title}
        </h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg bg-blue-50 text-blue-400 hover:bg-blue-100 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2 font-medium">{task.description}</p>
      )}

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="px-2 py-0.5 rounded-md bg-brand/10 text-brand font-bold text-[10px] uppercase tracking-wider">
          {task.category}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1 text-gray-400 font-bold">
            <Clock className="w-3 h-3" />
            {formatDue(task.dueDate)}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-black text-gray-600">{task.progress}%</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: `${task.progress}%` }} />
        </div>
      </div>

      {/* Move to other column */}
      <div className="flex gap-1.5 pt-2 border-t border-gray-50">
        {otherCols.map((col) => (
          <button
            key={col.status}
            onClick={() => onMove(task.id, col.status)}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-colors ${col.bg} ${col.color} hover:opacity-80`}
          >
            → {col.label}
          </button>
        ))}
      </div>
    </div>
  );
};
