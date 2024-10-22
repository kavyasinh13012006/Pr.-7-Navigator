import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function View() {
    const [recode, setrecode] = useState(JSON.parse(localStorage.getItem('curd')) || [])
    const [selectedIds, setSelectedIds] = useState([]) // स्टेट जिसमें सेलेक्टेड IDs होंगी
    const [filterStatus, setFilterStatus] = useState("All") // फ़िल्टर स्टेटस को स्टोर करें
    let navigate = useNavigate()

    // एक आइटम को डिलीट करना
    const deletDeta = (id) => {
        let del = recode.filter((val) => val.id !== id)
        setrecode(del)
        localStorage.setItem('curd', JSON.stringify(del))
    }

    // सभी सेलेक्टेड आइटम्स को डिलीट करना
    const allDelet = () => {
        let del = recode.filter((val) => !selectedIds.includes(val.id)) // जो सेलेक्टेड नहीं हैं उन्हें रखें
        setrecode(del)
        localStorage.setItem('curd', JSON.stringify(del))
        setSelectedIds([]) // सभी IDs को रिसेट करें
    }

    // Check All या Uncheck All functionality
    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = recode.map((val) => val.id) // सभी IDs को सेलेक्ट करें
            setSelectedIds(allIds)
        } else {
            setSelectedIds([]) // सभी को अनसेलेक्ट करें
        }
    }

    // किसी एक आइटम को सेलेक्ट या अनसेलेक्ट करना
    const toggleSelected = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id)) // अनसेलेक्ट करें
        } else {
            setSelectedIds([...selectedIds, id]) // सेलेक्ट करें
        }
    }

    // स्टेटस को एक्टिव और डिएक्टिव में टॉगल करना
    const statusDeta = (id, actvity) => {
        let up = recode.map((val) => {
            if (val.id == id) {
                val.actvity = actvity === "active" ? "deactive" : "active";
            }
            return val;
        })
        setrecode(up)
        localStorage.setItem('curd', JSON.stringify(up))
    }

    // Status फ़िल्टरिंग
    const filteredRecode = recode.filter((val) => {
        if (filterStatus === "All") return true; // सभी दिखाएं
        return val.actvity === filterStatus.toLowerCase(); // केवल चुना हुआ स्टेटस दिखाएं (active या deactive)
    });

    return (
        <>
            <h1>View Data</h1>

            {/* Filter Buttons */}

            <table>
                <tr>
                    <td>
                        <button onClick={allDelet}>Delete Selected</button>
                    </td>
                    
                    <td>
                        <div>
                            <button onClick={() => setFilterStatus("All")}>All</button>
                            <button onClick={() => setFilterStatus("Active")}>Active</button>
                            <button onClick={() => setFilterStatus("Deactive")}>Deactive</button>
                        </div>
                    </td>
                </tr>
            </table>

            <table border={1}>
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
                        <th>Phone</th>
                        <th>Action</th>
                        <th>Status</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        filteredRecode.map((val) => { // फ़िल्टर किए हुए रिकॉर्ड्स को दिखाएं
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
                                    <td>{val.phone}</td>
                                    <td>
                                        <button onClick={() => deletDeta(val.id)} type="button">Delete</button>
                                        <button onClick={() => navigate(`/Edit`, { state: val })} type="button">Update</button>
                                    </td>
                                    <td>
                                        {
                                            val.actvity == "active" ?
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
