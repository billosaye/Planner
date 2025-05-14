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
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition-all duration-200"
    >
      <div className="flex-1">
        <Link
          to="/tasks/$id"
          params={{ id: task._id }}
          className={`text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </Link>
        {task.description && (
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {task.description}
          </p>
        )}
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <button
          onClick={handleToggle}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            task.completed
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;