import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Add() {

    let navigate = useNavigate()
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    
    const [recode, setrecode] = useState(JSON.parse(localStorage.getItem('curd')) || [])
    const fileHandling = (e) => {
        e.preventDefault()
        alert('mahadev')
        let obj = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            phone: phone,
            actvity:"active"
        }

        console.log(obj);

        // console.log(obj);
        let updeta = [...recode, obj]
        setrecode(updeta)
        //    console.log(recode);
        navigate('/')
        localStorage.setItem('curd', JSON.stringify(updeta))

    }

    return (
        <>
            <h1>Add data</h1>
            <form onSubmit={fileHandling}>
                <spanp>name:- </spanp>
                <input value={name} onChange={(e) => setname(e.target.value)} type="text" />
                <spanp>phone:- </spanp>
                <input value={phone} onChange={(e) => setphone(e.target.value)} type="text" />
                <input type="Submit" value="Submit" />
            </form>
            <Link to={`/`}>View</Link>
        </>
    )
}

export default Add