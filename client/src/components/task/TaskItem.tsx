import React from 'react';
import { Link } from '@tanstack/react-router';
import useTaskStore from '../../store/taskStore';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleToggle = async () => {
    await updateTask(task._id, { completed: !task.completed });
  };

  return (
    <div className="bg-white p-4 mb-4 rounded shadow-md flex justify-between items-center">
      <div>
        <Link
          to="/tasks/$id"
          params={{ id: task._id }}
          className={`text-lg font-semibold cursor-pointer ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </Link>
        {task.description && <p className="text-gray-600">{task.description}</p>}
        <p className="text-sm text-gray-500">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            task.completed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
          onClick={handleToggle}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;