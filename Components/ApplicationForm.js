import React, { useState } from 'react'
import axios from 'axios'

const ApplicationForm = (props) => {

    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    
    const handleChange = (e) => {

        if(e.target.name === "name"){
            setName(e.target.value)
        }
        else if(e.target.name === "email"){
            setEmail(e.target.value)
        }
        else if(e.target.name === "phone"){
            setPhone(e.target.value)
        }
        else if(e.target.name === "jobTitle"){
            setJobTitle(e.target.value)
        }
        else if(e.target.name === "experience"){
            setExperience(e.target.value)
        }
        else if(e.target.name === "skills"){
            setSkills(e.target.value)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : name,
            email : email,
            phone : phone,
            jobTitle :jobTitle,
            experience: experience,
            skills : skills
        }

        axios.post(`http://dct-application-form.herokuapp.com/users/application-form`, formData)
        .then((response)=>{
            const result = response.data
            setUsers(result)
            console.log('users - api',users)

            if(result.hasOwnProperty("errors")){
                alert(result.message)
            }
            else{
                alert('application sent')
                props.history.push('/admin')
            }
        })
        .catch((err)=>{
            const error = err.message
            console.log(error) 
        })
    }

    return (
        <div>
            <h2> Apply for Job </h2>
            <form onSubmit = { handleSubmit }>
                <label> Fullname </label>
                <input type="text"
                    value = { name } 
                    onChange = { handleChange }
                    name="name"
                /><hr/>

                <label> Email </label>
                <input type="text" 
                    value = { email } 
                    onChange = { handleChange } 
                    name="email"
                /><hr/>

                <label> Contact phone </label>
                <input type="text" 
                    value = { phone } 
                    onChange = { handleChange } 
                    name="phone"
                /><hr/>

                <label> Applying for job </label>
                <select value = { jobTitle } onChange = { handleChange } name="jobTitle" required = { true } >
                    <option value = ""> Select </option> 
                    <option value = "Front-End Developer"> Front-End Developer </option> 
                    <option value = "Node.js Developer"> Node.js Developer </option> 
                    <option value = "MEAN Stack Developer"> MEAN Stack Developer </option> 
                    <option value = "FULL Stack Developer"> FULL Stack Developer </option> 
                </select><hr/>

                <label>Experience</label>
                <input type="text" 
                    value = { experience } 
                    onChange = { handleChange } 
                    name="experience"
                /><hr/>

                <label> Technical Skills </label>
                <textarea value = { skills } 
                    onChange = { handleChange }
                    name="skills"
                ></textarea><hr/>

                <input type="submit" value = "Send Application" />
            </form>
        </div>
    )
}

export default ApplicationForm