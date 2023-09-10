import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';

const Interview = () => {
  const [ interviews, setInterview ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ students, setStudents ] = useState([]);

  const Details = ({interview}) => {
    const [ newStudent, setNewStudent ] = useState([]);
    const addIt = (data)=> {
      setNewStudent(students.filter(student => student.name.toLowerCase().includes(data)));
      console.log(newStudent);
    }

    const addItHere = async () => {
      const studentIdtype = newStudent[0];
      const studentId = studentIdtype._id;
      console.log(studentId);
      const emp = JSON.parse(localStorage.getItem('emp'));
      const res = await axios.post('http://localhost:8000/emp/updateinterview/' + emp.id ,{
        id: interview._id,
        studentId,
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + emp.token,
        }
      });
      if(res.status === 201){
        toast.success('Added Student');
        window.location.reload(false);
      }
    }

    return <div className='m-4 bg-green-200 p-4'>
      <p>Interview Name :<b className='pl-4'>{interview.interview}</b></p>
      <p>Interview Date :<b className='pl-4'>{moment(interview.date).format('DD/MM/YYYY')}</b></p>
      <button onClick={addItHere} className='bg-blue-400 p-1 rounded-md hover:bg-blue-300'>Add Student</button>
      <div>
        Add Student By Name :
        <input type="text" name="student" placeholder="Enter student name" onChange={e=>addIt(e.target.value)}/>
        { newStudent && newStudent.map(student => <p key={student._id}>{student.name}</p>)}
      </div>
    </div>
  }

  const getData = async () => {
    const emp = JSON.parse(localStorage.getItem('emp'));
    const res = await axios.get('http://localhost:8000/emp/getinterview/' + emp.id , {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + emp.token,
      }
    });
    const interviewData = res.data;
    if (res.status === 200) {
      setInterview(interviewData);
      const studentFetch = await axios.get('http://localhost:8000/emp/getstudent/' + emp.id , {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + emp.token,
        }
      });
      if (studentFetch.status === 200) {
        setStudents(studentFetch.data);
      }
    }
  }

  useEffect(() => {
    getData();
  }, [count]);

  const AddInterview = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
      try {
        const emp = JSON.parse(localStorage.getItem('emp'));
        const res = await axios.post('http://localhost:8000/emp/addinterview/' + emp.id, data, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${emp.token}`
          }
        });
        if(res.status === 201) {
          toast.success("Successfully added interview");
          setCount(count + 1);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.error);
      }
    }
    return <section className='m-12 mr-32 ml-32 bg-blue-300 p-4'>
      <h2 className='text-center font-bold'>Add Interview Here</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between mb-4'>
          <label htmlFor='interview'>Interview</label>
          <input type='text' name='interview' placeholder='Interview Name' id='interview' {...register('interview')}/>
        </div>
        <div className='flex justify-between mb-4'>
          <label htmlFor='date'>Deadline Date</label>
          <input type='date' name='date' id='date' {...register('date')}/>
        </div>
        <div className='text-center'>
        <button type='submit' className='bg-green-300 p-2 rounded-md hover:bg-green-200'>Add Interview</button>
        </div>
      </form>
    </section>
  }

  return (
    <div>
      <AddInterview />
      { interviews && 
        interviews.map( interview => <Details interview={interview} key={interview._id}/> )
      }
    </div>
  )
}

export default Interview;