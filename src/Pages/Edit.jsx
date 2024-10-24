import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Edit() {
    const loc = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        setname(loc?.state?.name)
        setemail(loc?.state?.email)
        setpassword(loc?.state?.password)
        setgender(loc?.state?.gender)
        setcourse(loc?.state?.course || [])
        setdate(loc?.state?.date)
    }, [loc?.state])

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('')
    const [course, setcourse] = useState([])
    const [date, setdate] = useState('')
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
        let up = recode.map((val) => {
            if (val.id === loc?.state?.id) {
                val.name = name
                val.email = email
                val.password = password
                val.gender = gender
                val.course = course
                val.date = date
            }
            return val;
        })
        localStorage.setItem('curd', JSON.stringify(up))
        navigate('/')
    }

    return (
        <>
            <h1>Edit data</h1>
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
                    <input type="checkbox" value="Math" onChange={handleCheckboxChange} checked={course.includes("Math")} /> Math
                </label>
                <label>
                    <input type="checkbox" value="Science" onChange={handleCheckboxChange} checked={course.includes("Science")} /> Science
                </label>
                <label>
                    <input type="checkbox" value="English" onChange={handleCheckboxChange} checked={course.includes("English")} /> English
                </label>

                <span>Date:</span>
                <input value={date} onChange={(e) => setdate(e.target.value)} type="date" required />

                <input type="submit" value="Edit" />
            </form>
            <Link to={`/`}>View</Link>
        </>
    )
}

export default Edit
