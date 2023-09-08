import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
        console.log("Successfully added interview");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return <section>
    <h2>Add Interview Here</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='interview'>Interview</label>
        <input type='text' name='interview' placeholder='Interview Name' id='interview' {...register('interview')}/>
      </div>
      <div>
        <label htmlFor='date'>Deadline Date</label>
        <input type='date' name='date' id='date' {...register('date')}/>
      </div>
      <button type='submit'>Add Interview</button>
    </form>
  </section>
}

const Details = ({interview}) => {
  return <div>
    <p>Interview Name :{interview.interview}</p>
    <p>Interview Date :{interview.date}</p>
  </div>
}

const Interview = () => {
  const [ interviews, setInterview ] = useState([]);
  const getData = async () => {
    const emp = JSON.parse(localStorage.getItem('emp'));
    const res = await axios.get('http://localhost:8000/emp/getinterview/' + emp.id , {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + emp.token,
      }
    });
    const interviewData = res.data;
    setInterview(interviewData);
  }

  useEffect(() => {
    getData();
  }, []);

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