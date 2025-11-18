export default function ApiDataDisplay({ data, loading }) {
  if (loading) {
    return <p className="text-center text-gray-500">Loading API data...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(item => (
        <div
          key={item.id}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
        >
          <h3 className="font-semibold text-lg mb-2">
            {item.title}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            item.completed
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {item.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}
