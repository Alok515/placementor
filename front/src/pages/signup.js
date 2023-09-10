import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { setEmp } = useAuth();

    const onSubmit = async (data)=> {
        try {
            const res = await axios.post('http://localhost:8000/auth/signup', data);
            if (res.status === 201 ) {
                toast.success("Sign Up Success");
                const empData = res.data;
                localStorage.setItem('emp', JSON.stringify(empData.emp));
                setEmp(empData.emp);
                navigate('/', { replace: true });
            }
            window.location.reload(false);
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.error);
        }
    }

    return <>
        <section className='p-4'>
            <header className='text-center text-lg font-bold mb-10'>Sign Up</header>
            <main className='bg-gray-200 p-5'>
                <p className='text-center text-lg font-semibold mb-5'>Enter Your Details Here</p>
                <form onSubmit={handleSubmit(onSubmit)} className='text-center p-5'>
                <div className='mb-4'>
                    <label htmlFor='name' className='pr-11'>Name</label>
                    <input type='text' name='name' placeholder='Name' {...register('name')} id='name' />
                </div>
                    <div className='mb-4'>
                    <label htmlFor='email' className='pr-11'>Email</label>
                    <input type="email" id="email" {...register('email')} placeholder='example@example.com' />
                    </div>
                    <div className='mb-4'>
                    <label htmlFor='password' className='pr-4'>Password</label>
                    <input type="password" id="password" {...register('password')} />
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

export default SignUp;