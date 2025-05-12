import React from 'react';
import TaskItem from './TaskItem';
import useTaskStore from '../../store/taskStore';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;