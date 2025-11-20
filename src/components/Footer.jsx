export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto py-8 px-6 text-center">
        <p className="text-lg">
          © {new Date().getFullYear()} PLP Task Manager • Built with React + Tailwind CSS
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Panaversity Learning Platform – Cohort 2025
        </p>
      </div>
    </footer>
  );
}
