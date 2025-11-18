export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center">
          © {new Date().getFullYear()} PLP Task Manager • Built with React + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
