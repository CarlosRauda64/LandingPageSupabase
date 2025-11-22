import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import AuthContext from './AuthContext';
import Loading from '../pages/Common/Loading.jsx';

// Proveedor de autenticación que maneja el estado de autenticación del usuario con Supabase
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtiene el usuario del estado
  function getUser() {
    return user;
  }

  // Cierra la sesión del usuario
  async function signout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error al cerrar sesión:', error);
      }
      // El estado se actualizará automáticamente mediante onAuthStateChange
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  useEffect(() => {
    // Verifica la sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Escucha cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    // Limpia la suscripción al desmontar el componente
    return () => {
      subscription.unsubscribe();
    };
  }, []);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getUser,
        signout,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;