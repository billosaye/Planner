import React from 'react';
import Layout from './components/layout/Layout';
import TaskList from './components/task/TaskList';
import TaskForm from './components/form/TaskForm';

const App: React.FC = () => {
  return (
    <Layout>
      <TaskForm />
      <TaskList />
    </Layout>
  );
};

export default App;