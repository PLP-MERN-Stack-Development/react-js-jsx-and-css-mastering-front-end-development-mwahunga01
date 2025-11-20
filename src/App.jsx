import { useState, useEffect } from 'react';
import TaskManager from './components/TaskManager';
import ApiDataDisplay from './components/ApiDataDisplay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('plp-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('plp-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Fetch external API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=12')
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
      title: title.trim(),
      completed: false,
      createdAt: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
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

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Task Manager */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PLP Task Manager
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Stay organized • Achieve more
            </p>
          </div>

          <TaskManager
            tasks={tasks}
            addTask={addTask}
            toggleTask
