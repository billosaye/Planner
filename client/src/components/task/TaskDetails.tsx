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
    navigate({ to: '/' });
  };

  const handleDelete = async () => {
    if (!task) return;
    await deleteTask(task._id);
    navigate({ to: '/' });
  };

  if (!task) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Task Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Task Details</h2>
      <form onSubmit={handleSave} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              className="mr-2"
            />
            <span className="text-gray-700">Completed</span>
          </label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <Link
            to="/"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;