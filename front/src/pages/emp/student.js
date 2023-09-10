import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Student = () => {
  const [ students , setStudent ] = useState([]);
  const [ count, setCount ] = useState(0);

  const Details = ({student})=>{
    const changeIt = async () => {
      try {
        const emp = JSON.parse(localStorage.getItem('emp'));
        const res = await axios.put('http://localhost:8000/emp/updatestudent/' + emp.id , {
          name: student.name,
          email: student.email
        },{
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + emp.token,
          }
        });
        if ( res.status === 200 ){
          toast.success("Student updated successfully");
          setCount(count + 1);
          console.log('Change done')
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.error);
      }
    }
    
    return <div className='w-5/12 bg-green-300 p-8 m-2'>
      <p>Name :<b className='ml-32'>{student.name}</b></p>
      <p>Collage :<b className='ml-28'>{student.collage}</b></p>
      <p>Batch :<b className='ml-32'>{student.batch}</b></p>
      <p>Dsa Score :<b className='ml-24'>{student.dsa}</b></p>
      <p>React Score :<b className='ml-20'>{student.react}</b></p>
      <p>Web Dev Score :<b className='ml-14'>{student.webdev}</b></p>
      <p>Placement Status :<b className='ml-10'>{student.isPlaced ? "Placed" : "Not Placed"}</b></p>
      { !student.isPlaced && 
        <div className='pr-2'>
          <input type="radio" name="isPlaced" value="Placed" onChange={changeIt}/> Mark as Placed 
        </div>
      }
    </div>
  }

  const getData = async () => {
    const emp = JSON.parse(localStorage.getItem('emp'));
    const res = await axios.get('http://localhost:8000/emp/getstudent/' + emp.id , {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + emp.token,
      }
    });
    const studentData = res.data;
    setStudent(studentData);
  }

  useEffect(() => {
    getData();
  }, [count]);

  const AddStudent = () => {
    const { register, handleSubmit } = useForm();
    
    const Input = ({ placeholder, type, name, register }) => {
      return <div className='flex justify-between m-4'>
        <label htmlFor={ name }>{ placeholder }</label>
        <input className="rounded-sm" type={ type } placeholder={ name } id={ name } {...register( name )}/>
      </div>
    }

    const onSubmit = async (data) => {
      try {
        const emp = JSON.parse(localStorage.getItem('emp'));
        const res = await axios.post('http://localhost:8000/emp/addstudent/' + emp.id, data, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${emp.token}`
          }
        });
        if(res.status === 201) {
          toast.success("Successfully added student");
          setCount(count + 1);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    }
    return <section className='m-32 p-4 font-semibold bg-gray-200'>
        <h3 className='text-center font-bold'>Add Student Details Here</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Enter Batch" type="text" name="batch" register={register} />
          <Input placeholder="Enter Name" type="text" name="name" register={register}/>
          <Input placeholder="Enter Email" type="email" name="email" register={register}/>
          <Input placeholder="Enter Collage" type="text" name="collage" register={register}/>
          <Input placeholder="Enter Dsa Score" type="number" name="dsa" register={register}/>
          <Input placeholder="Enter React Score" type="number" name="react" register={register}/>
          <Input placeholder="Enter WebDevlopment Score" type="number" name="webdev" register={register}/>
          <div className='text-center'>
          <button type='submit' className='bg-blue-500 text-lg p-2 rounded-md text-gray-200 hover:bg-blue-400'>Add Student</button>
          </div>
        </form>
    </section>
  }

  return (
    <div>
      <AddStudent />
      <section className='flex flex-wrap text-lg bg-blue-200 justify-between m-4 p-2'>
      { students &&
        students.map(student => <Details student={student} key={student.id}/> )
      }
      </section>
    </div>
  )
}

export default Student;