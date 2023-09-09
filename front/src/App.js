import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/home';
import Nav from './pages/nav';
import Student from './pages/emp/student';
import Interview from './pages/emp/interview';
import Result from './pages/emp/result';

function App() {
  const emp1 = JSON.parse(localStorage.getItem('emp'));
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            { emp1 && 
            <Route>
              <Route index element={<Home />}/> 
              <Route path='student' element={<Student  />} />
              <Route path='interview' element={<Interview />} />
              <Route path='result' element={<Result />}/>
            </Route>
            }
            <Route index element={<Nav />}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
