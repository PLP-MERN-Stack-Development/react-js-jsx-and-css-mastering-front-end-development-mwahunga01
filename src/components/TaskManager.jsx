import { useState } from 'react';
import Button from './Button';

export default function TaskManager({ tasks, addTask, toggleTask, deleteTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-10 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done today?"
          className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition text-lg font-medium"
        />
        <Button type="submit" variant="primary" size="lg">
          Add Task
        </Button>
      </form>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4 opacity-20">No tasks yet</p>
            <p className="text-xl text-gray-500 dark:text-gray-400">Add one above to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="group flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <div>
                  <p className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {task.createdAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-3xl font-bold transition-opacity duration-200"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
