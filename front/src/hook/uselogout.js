import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { setEmp } = useAuth();
    const logout = () => {
        localStorage.removeItem('emp');
        setEmp(null);
    }
    return { logout };
}