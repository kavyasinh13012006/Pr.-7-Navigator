import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function View() {
    const [recode, setrecode] = useState(JSON.parse(localStorage.getItem('curd')) || [])
    const [selectedIds, setSelectedIds] = useState([])
    const [filterStatus, setFilterStatus] = useState("All")
    const [searchTerm, setSearchTerm] = useState("") // For search box
    const [sortOrder, setSortOrder] = useState("")   // For sorting

    let navigate = useNavigate()

    const deletDeta = (id) => {
        let del = recode.filter((val) => val.id !== id)
        setrecode(del)
        localStorage.setItem('curd', JSON.stringify(del))
    }

    const allDelet = () => {
        let del = recode.filter((val) => !selectedIds.includes(val.id))
        setrecode(del)
        localStorage.setItem('curd', JSON.stringify(del))
        setSelectedIds([])
    }

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = recode.map((val) => val.id)
            setSelectedIds(allIds)
        } else {
            setSelectedIds([])
        }
    }

    const toggleSelected = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    const statusDeta = (id, actvity) => {
        let up = recode.map((val) => {
            if (val.id === id) {
                val.actvity = actvity === "active" ? "deactive" : "active";
            }
            return val;
        })
        setrecode(up)
        localStorage.setItem('curd', JSON.stringify(up))
    }

    const filteredRecode = recode.filter((val) => {
        if (filterStatus === "All") return true;
        return val.actvity === filterStatus.toLowerCase();
    });

    // Filter by search term
    const searchedRecords = filteredRecode.filter((val) => {
        return val.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    // Sort records by name A-Z or Z-A
    const sortedRecords = searchedRecords.sort((a, b) => {
        if (sortOrder === "A-Z") {
            return a.name.localeCompare(b.name)
        } else if (sortOrder === "Z-A") {
            return b.name.localeCompare(a.name)
        }
        return 0
    })

    return (
        <>
            <h1>View Data</h1>

            {/* Search Box */}


            {/* Sorting Buttons */}


            <table>
                <tr>
                    <td>
                        <button onClick={allDelet}>Delete Selected</button>
                    </td>
                    <td> <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: "20px", padding: "5px" }}
                    /></td>

                    <td>
                        <div>
                            <button onClick={() => setFilterStatus("All")}>All</button>
                            <button onClick={() => setFilterStatus("Active")}>Active</button>
                            <button onClick={() => setFilterStatus("Deactive")}>Deactive</button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button onClick={() => setSortOrder("A-Z")}>Sort A-Z</button>
                            <button onClick={() => setSortOrder("Z-A")}>Sort Z-A</button>
                        </div>
                    </td>
                </tr>
            </table>

            <table border={1} width="70%">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={toggleSelectAll}
                                checked={selectedIds.length === recode.length && recode.length > 0}
                            />
                            Select All
                        </th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedRecords.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => toggleSelected(val.id)} checked={selectedIds.includes(val.id)}
                                        />
                                    </td>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.password}</td>
                                    <td>{val.gender}</td>
                                    <td>{val.course}</td>
                                    <td>{val.date}</td>
                                    <td>
                                        <button onClick={() => deletDeta(val.id)} type="button">Delete</button>
                                        <button onClick={() => navigate(`/Edit`, { state: val })} type="button">Update</button>
                                    </td>
                                    <td>
                                        {
                                            val.actvity === "active" ?
                                                <button onClick={() => statusDeta(val.id, val.actvity)} type="button" style={{ backgroundColor: 'green' }}>Active</button> :
                                                <button onClick={() => statusDeta(val.id, val.actvity)} type="button" style={{ backgroundColor: 'red' }}>Deactive</button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to={"/Add"}>Add+</Link>
        </>
    )
}

export default View
