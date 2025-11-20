export default function ApiDataDisplay({ data, loading }) {
  if (loading) {
    return <p className="text-center text-gray-500 text-lg py-10">Loading API data...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(item => (
        <div
          key={item.id}
          className="border border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="font-bold text-lg mb-3 line-clamp-2">
            {item.title}
          </h3>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            item.completed
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
          }`}>
            {item.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}
