import { Outlet, Link } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Contenedor del formulario */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <Outlet />
        </div>

        {/* Footer opcional */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Landing Page Mother. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

