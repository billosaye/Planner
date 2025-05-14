import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import useTaskStore from '../../store/taskStore';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h2>
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      {!loading && !error && tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available. Add a task to get started!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;