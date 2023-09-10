import { NavLink } from "react-router-dom";
import { useLogout } from '../hook/uselogout';
import axios from 'axios';
import toast from 'react-hot-toast';
import fileDownloader from 'js-file-download';

const Home = () => {
    const { logout } = useLogout();
    const logoutHandler = () => {
        toast.success('Logged out');
        logout();
        window.location.reload(false);
    }

    const handleIt = async () => {
        try {
            const emp = JSON.parse(localStorage.getItem('emp'));
        const res = await axios.get('http://localhost:8000/emp/csv/' + emp.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + emp.token,
            },
        });
        if ( res.status === 200 ) {
            toast.success('Success in creating csv file');
            fileDownloader(res.data, 'studentData.csv');
        }
        else {
            toast.error(res.message);
        }
        } catch (error) {
            toast.error(error.response?.data?.error);
        }
    }
    
    return <div className="p-4 m-4 bg-gray-200 text-center">
        <h1 className="text-lg mb-20 font-bold">Welcome!</h1>
        <div className="p-2 mb-6">
        <NavLink to='/student'className='m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500'>Add and View Students</NavLink>
        </div>
        <div className="mb-8 mt-2">
        <NavLink to='/interview' className='m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500'>Add and Update Interview</NavLink>
        </div>
        <div className="mb-8 mt-2">
        <NavLink to='/result' className='m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500'>View Resluts</NavLink>
        </div>        
        <div>
            <button onClick={ handleIt } className="m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500"> Create Csv </button>
        </div>
        <div>
        <button onClick={ logoutHandler } className="m-auto mb-5 bg-blue-700 p-4 text-yellow-50 rounded-xl 
            active:bg-blue-600 hover:bg-red-500">Logout</button>
        </div>
    </div>
}

export default Home;