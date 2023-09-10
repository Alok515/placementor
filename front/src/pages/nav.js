import { NavLink } from "react-router-dom";

const Nav = ()=> {
    return <div className="bg-gray-100 m-3">
        <h1 className="text-center font-bold text-lg mb-32 mt-5">Are You a Employee!!!!</h1>
        <nav className="flex flex-col content-center font-semibold">
            <NavLink to='/login' 
            className='m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500'
            >Login Here</NavLink>
            <NavLink to='/register'
            className='m-auto mb-10 bg-green-700 p-4 text-yellow-50 rounded-xl 
            active:bg-green-600 hover:bg-red-500'
            >Register Here</NavLink>
        </nav>
    </div>
}

export default Nav;