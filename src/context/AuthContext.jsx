import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  getUser: () => null,
  signout: async () => {},
});

export default AuthContext;