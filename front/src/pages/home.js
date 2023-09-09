import { NavLink } from "react-router-dom";
import { useLogout } from '../hook/uselogout';

const Home = () => {
    const { logout } = useLogout();
    const logoutHandler = () => {
        logout();
        window.location.reload(false);
    }
    
    return <div>
        <h1>Hello  </h1>
        <NavLink to='/student'>Add and View Students</NavLink>
        <NavLink to='/interview'>Add and Update Interview</NavLink>
        <NavLink to='/result'>View Resluts</NavLink>
        <button onClick={ logoutHandler }>Logout</button>
    </div>
}

export default Home;