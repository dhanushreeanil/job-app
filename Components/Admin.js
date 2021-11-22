import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as ReactBootStrap from "react-bootstrap"

const Admin = (props) => {
    
    const [jobTitle, setJobTitle] = useState('')
    const [isClicked , setIsClicked] = useState(false)
    const [candidates, setCandidates] = useState([])
    const [job, setJob] = useState([])
    const [details, setDetail] = useState ({})
    
    const handleToggle = (e) => {
        setIsClicked(!isClicked)
    }

    const handleJob = (e) =>{
        const result = e.target.value
        setJobTitle(result)
        if(result === 'Front-End Developer'){
            const front = candidates.filter((ele)=>{
                return ele.jobTitle === result
            })
            console.log('candidateJob', front)
            setJob(front)
             handleToggle()
        }
        else if(result === 'Node.js Developer'){
            const node = candidates.filter((ele)=>{
                return ele.jobTitle === result
            })
            console.log('candidateJob', node)
            setJob(node)
             handleToggle()
        }
        else if(result === 'MEAN Stack Developer'){
            const mean = candidates.filter((ele)=>{
                return ele.jobTitle === result
            })
            console.log('candidateJob', mean)
            setJob(mean)
             handleToggle()
        }
        else if(result === 'FULL Stack Developer'){
            const full = candidates.filter((ele)=>{
                return ele.jobTitle === result
            })
            console.log('candidateJob', full)
            setJob(full)
            handleToggle()
        }
    }
    const handleDetails = (candidate) =>{
        const result = {
            name : candidate.name,
            phone : candidate.phone,
            email: candidate.email,
            experience : candidate.experience,
            skills : candidate.skills
        } 
        swal({
            title : `${result.name} Profile`,
            text : `Contact : ${result.phone} ,
                    email : ${result.email},
                    experience : ${result.experience},
                    skills : ${result.skills}`,
            button : "cancel"                       
            })
        setDetail(result)
    }
    
    useEffect(()=>{
        axios.get(`http://dct-application-form.herokuapp.com/users/application-forms`)
            .then(response=>{
                const result = response.data
                setCandidates(result)
                console.log(result)
            })
            .catch(err =>{
                const error = err.message
                console.log(error)
            })
    },[])

    return (
        <div>
            <h2> Admin Dashboard </h2>
            <button value = "Front-End Developer" onClick = { handleJob }> Front End Developer </button> 
            <button value = "Node.js Developer" onClick = { handleJob }> Node.js Developer </button> 
            <button value = "MEAN Stack Developer" onClick = { handleJob }> MEAN Stack Developer </button> 
            <button value = "FULL Stack Developer" onClick = { handleJob }> FULL Stack Developer </button>
            { isClicked && (<div>
               <h4> { jobTitle } </h4>
               <h5> List of candidates applied for { jobTitle } - { job.length } </h5>
                <ReactBootStrap.Table striped bordered hover className="table">
                    <thead>
                        <th >
                            <tr>
                                <td >Name</td>
                                <td >Technical Skills</td>
                                <td >Experience</td>
                                <td >Applied Date</td>
                                <td >View Details</td>
                                <td >Update Application Status</td>
                            </tr>
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            {   job.map(candidate => {
                                return (<div>
                                    <td >{ candidate.name }</td>
                                    <td > { candidate.skills } </td>
                                    <td > { candidate.experience } </td>
                                    <td > { candidate.createdAt } </td>
                                    <td> <button  
                                        onClick = {() => { handleDetails(candidate) }}> view details 
                                        </button>
                                    </td>
                                    <td > 
                                        <button  disabled={candidate.status === "shortlisted"}>
                                             shortlisted
                                        </button>
                                        <button disabled={candidate.status === "rejected"}>
                                             rejected 
                                        </button>
                                    </td>
                                </div>)
                            }) }
                        </tr>
                    </tbody>
                </ReactBootStrap.Table>
            </div>) }
        </div>
    )
}

export default Admin