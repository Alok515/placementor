import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ result }) => {
    return <div>
        <p>Interview Result :{result.result}</p>
        <p>Interview Name :{result.interviewName}</p>
        <p>Student Name :{result.studentName}</p>
    </div>
}

const Result = () => {
    const [results, setresults] = useState([]);
    const getResult = async () => {
        const emp = JSON.parse(localStorage.getItem('emp'));
        const res = await axios.get('http://localhost:8000/emp/result/' + emp.id, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + emp.token,
            }
        });
        if (res.status === 200 ){
            console.log("data Fetched");
            console.log(res.data);
            setresults(res.data);
        }
    }

    useEffect(() => {
        getResult();
    }, [])

    return (
        <>
            <div>Result</div>
            { results && results.map(result => <Display result={result} key={result._id} />)}
        </>
    )
}

export default Result;