import { useState, useEffect } from 'react';
import './App.css';
import TaskManager from './components/TaskManager';
import ApiDataDisplay from './components/ApiDataDisplay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('plp-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plp-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Fetch data from external API (JSONPlaceholder)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addTask = (title) => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        {/* Task Manager Section */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
            PLP Task Manager
          </h1>
          <TaskManager
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>

        {/* API Data Display */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">
            External API Data (JSONPlaceholder Todos)
          </h2>
          <ApiDataDisplay data={apiData} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
