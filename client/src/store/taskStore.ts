import { create } from 'zustand';

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
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: string) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      _id: '1',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      completed: false,
      createdAt: '2025-05-12T12:00:00.000Z',
      updatedAt: '2025-05-12T12:00:00.000Z',
    },
    {
      _id: '2',
      title: 'Finish project',
      completed: true,
      createdAt: '2025-05-12T12:00:00.000Z',
      updatedAt: '2025-05-12T12:00:00.000Z',
    },
  ],
  addTask: (title: string, description?: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          _id: Date.now().toString(),
          title,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  toggleTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
      ),
    })),
}));

export default useTaskStore;