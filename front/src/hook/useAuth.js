import { Auth } from '../context/auth';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(Auth);
    if (!context) {
        throw Error('Context not available');
    }
    return context;
}