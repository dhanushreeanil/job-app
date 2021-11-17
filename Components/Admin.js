import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

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
    // const handleShortlist = (candidate) =>{
    //     setShortlist("shortlisted")
    // }
    // const handleReject = (candidate) =>{
    //     setReject("Rejected")
    // }

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
               <h3> { jobTitle } </h3>
               <h5> List of candidates applied for { jobTitle } - { job.length } </h5>
                <table border = "1" style = {{ "borderCollapse" : "collapse", "width" : "100%" }} >
                    <thead>
                        <th >
                            <tr style = {{ "width" : "20%" }}>
                                <td style = {{ "width" : "15%" }}>Name</td>
                                <td style = {{ "width" : "20%" }}>Technical Skills</td>
                                <td style = {{ "width" : "20%" }}>Experience</td>
                                <td style = {{ "width" : "20%" }}>Applied Date</td>
                                <td style = {{ "width" : "10%" }}>View Details</td>
                                <td style = {{ "width" : "15%" }}>Update Application Status</td>
                            </tr>
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            {   job.map(candidate => {
                                return (<div>
                                    <td style = {{ "width" : "15%" }}>{ candidate.name }</td>
                                    <td style = {{ "width" : "20%" }}> { candidate.skills } </td>
                                    <td style = {{ "width" : "20%" }}> { candidate.experience } </td>
                                    <td style = {{ "width" : "20%" }}> { candidate.createdAt } </td>
                                    <td style = {{ "width" : "10%" }}> <button style = {{ backgroundColor: "gray", color: "white" }} 
                                        onClick = {() => { handleDetails(candidate) }}> view details </button> </td>
                                    <td style = {{ "width" : "15%" }}> 
                                        {/* <button onClick = {()=>{ handleShortlist(candidate) }} */}
                                        <button 
                                         style = {{ backgroundColor: "green", color: "white", width : "50%", fontSize : "11px" }}>
                                             { candidate.status === 'shortlisted' ? "shortlisted" : "shortlist" } 
                                        </button>
                                        {/* <button onClick = {() => { handleReject( candidate ) }} */}
                                        <button
                                            style = {{ backgroundColor: "red", color: "white", width : "50%", fontSize : "11px" }}>
                                             { candidate.status === "rejected" ? "rejected" : "reject" } 
                                        </button>
                                    </td>
                                </div>)
                            }) }
                        </tr>
                    </tbody>
                </table>
            </div>) }
        </div>
    )
}

export default Admin

{/* <button style = {{ backgroundColor: "green", color: "white" }}> 
                                        { candidate.status === 'shortlisted' ?  } 
                                        </button>
                                        <button style = {{ backgroundColor: "red", color: "white" }} 
                                            onClick = { handleReject } 
                                        > reject </button> */}