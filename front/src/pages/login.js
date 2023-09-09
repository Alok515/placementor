import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { setEmp } = useAuth();

    const onSubmit = async (data)=> {
        try {
            const res = await axios.post('http://localhost:8000/auth/login', data);
            const empData = res.data;
            localStorage.setItem("emp", JSON.stringify(empData.emp));
            setEmp(empData.emp);
            navigate('/', { replace: true });
            window.location.reload(false);
        } catch (error) {
            console.log(error.massage);
        }
    }

    return <>
        <section>
            <header>Login</header>
            <main>
                <p>Enter Your Details Here</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" {...register('email')} placeholder='example@example.com' />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" {...register('password')} />
                    <button type="submit">Submit</button>
                </form>
            </main>
        </section>
    </>
}

export default Login;