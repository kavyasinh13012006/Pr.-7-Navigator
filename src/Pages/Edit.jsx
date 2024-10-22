import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function Edit() {
  const loc = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    setname(loc?.state?.name)
    setphone(loc?.state?.phone)
  }, [loc?.state])
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [recode, setrecode] = useState(JSON.parse(localStorage.getItem('curd')) || [])
  const fileHandling = (e) => {
    e.preventDefault()
    let up = recode.map((val) => {
      if (val.id === loc?.state?.id) {
        val.name = name
        val.phone = phone
      }
      return val;
    })
    localStorage.setItem('curd', JSON.stringify(up))
    navigate('/')
  }
  return (
    <>
      <h1>Updeta data</h1>
      <form onSubmit={fileHandling}>
        <span>name:- </span>
        <input value={name} onChange={(e) => setname(e.target.value)} type="text" />
        <span>phone:- </span>
        <input value={phone} onChange={(e) => setphone(e.target.value)} type="text" />
        <input type="Submit" value="Edit" />
      </form>
      <Link to={`/`}>view</Link>
    </>
  )
}

export default Edit