import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import TaskList from './components/task/TaskList';
import TaskForm from './components/form/TaskForm';
import TaskDetails from './components/task/TaskDetails';
import Layout from './components/layout/layout';

// Create a root route that uses the Layout component
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  )
});

// Create an index route for the home page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <TaskForm />
      <TaskList />
    </>
  ),
});

// Create a route for task details
const taskDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/$id',
  component: TaskDetails,
});

// Add all routes to the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  taskDetailsRoute
]);

// Create the router instance
const router = createRouter({ routeTree });

export default router;