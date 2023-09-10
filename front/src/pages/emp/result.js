import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ result }) => {
    return <div className="bg-yellow-200 m-2 p-2">
        <p>Interview Result :<b className="pl-4">{result.result}</b></p>
        <p>Interview Name :<b className="pl-4">{result.interviewName}</b></p>
        <p>Student Name :<b className="pl-6">{result.studentName}</b></p>
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
        <section className="m-8 bg-gray-200 p-4">
            <div className="text-center font-bold mb-6">Result</div>
            { results && results.map(result => <Display result={result} key={result._id} />)}
        </section>
    )
}

export default Result;