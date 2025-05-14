import React, { useState, FormEvent, useEffect } from 'react';
import { useParams, Link, useNavigate } from '@tanstack/react-router';
import useTaskStore from '../../store/taskStore';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams({ from: '/tasks/$id' });
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const task = tasks.find((t) => t._id === id);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!task || !title.trim()) return;
    await updateTask(task._id, {
      title,
      description: description || undefined,
      completed,
    });
    if (!error) navigate({ to: '/' });
  };

  const handleDelete = async () => {
    if (!task) return;
    await deleteTask(task._id);
    if (!error) navigate({ to: '/' });
  };

  if (!task) {
    return (
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Task Not Found
        </h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Task
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded-lg shadow-md transition-all duration-300"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="Enter task title"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="Enter task description"
            rows={3}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <span className="text-gray-700 font-medium">Completed</span>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              'Save'
            )}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center disabled:bg-red-400"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Deleting...
              </div>
            ) : (
              'Delete'
            )}
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;