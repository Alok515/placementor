import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
          setCount(count + 1);
          console.log('Change done')
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    
    return <div>
      <p>Name :{student.name}</p>
      <p>Collage :{student.collage}</p>
      <p>Batch :{student.batch}</p>
      <p>Dsa Score :{student.dsa}</p>
      <p>React Score :{student.react}</p>
      <p>Web Dev Score :{student.webdev}</p>
      <p>Placement Status :{student.isPlaced ? "Placed" : "Not Placed"}</p>
      { !student.isPlaced && 
        <>
          <input type="radio" name="isPlaced" value="Placed" onChange={changeIt}/> Mark as Placed 
        </>
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
      return <div>
        <label htmlFor={ name }>{ placeholder }</label>
        <input type={ type } placeholder={ name } id={ name } {...register( name )}/>
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
          console.log("Successfully add student");
          setCount(count + 1);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return <section>
        <h3>Add Student Details Here</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Enter Batch" type="text" name="batch" register={register} />
          <Input placeholder="Enter Name" type="text" name="name" register={register}/>
          <Input placeholder="Enter Email" type="email" name="email" register={register}/>
          <Input placeholder="Enter Collage" type="text" name="collage" register={register}/>
          <Input placeholder="Enter Dsa Score" type="number" name="dsa" register={register}/>
          <Input placeholder="Enter React Score" type="number" name="react" register={register}/>
          <Input placeholder="Enter WebDevlopment Score" type="number" name="webdev" register={register}/>
          <button type='submit'>Add Student</button>
        </form>
    </section>
  }

  return (
    <div>
      <AddStudent />
      { students &&
        students.map(student => <Details student={student} key={student.id}/> )
      }
    </div>
  )
}

export default Student;