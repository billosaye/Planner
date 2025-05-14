import React, { useState, FormEvent } from 'react';
import useTaskStore from '../../store/taskStore';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTask = useTaskStore((state) => state.addTask);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title, description || undefined);
    if (!error) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add Task
      </h3>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}
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
          Description (optional)
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
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:bg-blue-400"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Adding...
          </div>
        ) : (
          'Add Task'
        )}
      </button>
    </form>
  );
};

export default TaskForm;