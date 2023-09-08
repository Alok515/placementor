import { NavLink } from "react-router-dom";

const Nav = ()=> {
    return <>
        <h1>Are You a Employee!!!!</h1>
        <nav>
            <NavLink to='/login'>Login Here</NavLink>
            <NavLink to='/register'>Register Here</NavLink>
        </nav>
    </>
}

export default Nav;