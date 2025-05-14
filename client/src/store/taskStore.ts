import { create } from 'zustand';
import api from '../services/api';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/tasks');
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch tasks' });
      console.error('Failed to fetch tasks:', error);
    }
  },
  addTask: async (title: string, description?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/tasks', { title, description });
      set((state) => ({
        tasks: [...state.tasks, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to add task' });
      console.error('Failed to add task:', error);
    }
  },
  updateTask: async (id: string, updates: Partial<Task>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to update task' });
      console.error('Failed to update task:', error);
    }
  },
  deleteTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to delete task' });
      console.error('Failed to delete task:', error);
    }
  },
}));

export default useTaskStore;