import { NavLink } from "react-router-dom";

const Home = () => {
    const logout = () => {
        localStorage.removeItem('emp');
    }
    
    return <div>
        <h1>Hello  </h1>
        <NavLink to='/student'>Add and View Students</NavLink>
        <NavLink to='/interview'>Add and Update Interview</NavLink>
        <button onClick={logout}>Logout</button>
    </div>
}

export default Home;