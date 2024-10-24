import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Add() {
    let navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [gender, setgender] = useState("")
    const [course, setcourse] = useState([])
    const [date, setdate] = useState("")
    
    const [recode, setrecode] = useState(JSON.parse(localStorage.getItem('curd')) || [])

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setcourse([...course, value])
        } else {
            setcourse(course.filter(c => c !== value))
        }
    }

    const fileHandling = (e) => {
        e.preventDefault()
        let obj = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            email: email,
            password: password,
            gender: gender,
            course: course,
            date: date,
            actvity: "active"
        }

        let updeta = [...recode, obj]
        setrecode(updeta)
        localStorage.setItem('curd', JSON.stringify(updeta))
        navigate('/')
    }

    return (
        <>
            <h1>Add data</h1>
            <form onSubmit={fileHandling}>
                <span>Name:</span>
                <input value={name} onChange={(e) => setname(e.target.value)} type="text" required />
                
                <span>Email:</span>
                <input value={email} onChange={(e) => setemail(e.target.value)} type="email" required />

                <span>Password:</span>
                <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" required />

                <span>Gender:</span>
                <label>
                    <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setgender(e.target.value)} /> Male
                </label>
                <label>
                    <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setgender(e.target.value)} /> Female
                </label>

                <span>Course:</span>
                <label>
                    <input type="checkbox" value="HTML" onChange={handleCheckboxChange} /> HTML
                </label>
                <label>
                    <input type="checkbox" value="Javascript" onChange={handleCheckboxChange} /> Javascript
                </label>
                <label>
                    <input type="checkbox" value="React-js" onChange={handleCheckboxChange} /> React
                </label>

                <span>Date:</span>
                <input value={date} onChange={(e) => setdate(e.target.value)} type="date" required />

                <input type="submit" value="Submit" />
            </form>
            <Link to={`/`}>View</Link>
        </>
    )
}

export default Add
