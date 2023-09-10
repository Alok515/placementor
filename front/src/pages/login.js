import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { setEmp } = useAuth();

    const onSubmit = async (data)=> {
        try {
            const res = await axios.post('http://localhost:8000/auth/login', data);
            if (res.status === 200 ) {
                toast.success('logged in successfully');
                const empData = res.data;
                localStorage.setItem("emp", JSON.stringify(empData.emp));
                setEmp(empData.emp);
                navigate('/', { replace: true });
            }
            else if (res.status === 400) {
                toast.error(res.data?.error);
                console.log(res.data);
            }
            window.location.reload(false);
        } catch (error) {
            console.log(error.response?.data?.error);
            toast.error(error.response?.data?.error);
        }
    }

    return <>
        <section className='m-2 font-serif'>
            <header className='font-bold text-center mb-10 text-lg'>Login</header>
            <main className='p-8 bg-gray-200'>
                <p className='text-center font-semibold mb-10'>Enter Your Details Here</p>
                <form onSubmit={handleSubmit(onSubmit)}
                className='flex justify-between'
                >
                <div>
                    <label htmlFor='email' className='pr-2'>Email</label>
                    <input type="email" id="email" {...register('email')} placeholder='example@example.com' 
                        className='border-2 rounded-lg'
                    />
                    </div>
                    <div>
                    <label htmlFor='password' className='pr-2'>Password</label>
                    <input type="password" id="password" {...register('password')} 
                        className='border-2 rounded-lg'
                    />
                    </div>
                    <button type="submit"
                    className='bg-blue-700 rounded-lg pl-3 pr-3 text-lg text-white
                    hover:bg-red-400'
                    >Submit</button>
                </form>
            </main>
        </section>
    </>
}

export default Login;