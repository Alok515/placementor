import Student from "../../model/student.js";
import Interview from '../../model/interview.js';

const getStudent = async (req, res) => {
    const id = req.params?.id;
    try {
        const students = await Student.getStudent(id);
        return res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const addStudent = async (req, res) => {
    const id = req.params?.id;
    const student = req.body;
    student.empId = id;
    try {
        const newStudent = await Student.addStudent( student );
        return res.status(201).json(newStudent);
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const getInterview = async (req, res) => {
    const id = req.params?.id;
    try {
        const interviews = await Interview.getInterview( id );
        return res.status(200).json( interviews );
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const addinterview = async (req, res) => {
    const id = req.params?.id;
    const interview = req.body;
    interview.empId = id;
    try {
        const newInterview = await Interview.addinterview( interview );
        return res.status(201).json( newInterview );
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}


const studentController = {
    getStudent,
    addStudent,
    getInterview,
    addinterview,
}

export default studentController;