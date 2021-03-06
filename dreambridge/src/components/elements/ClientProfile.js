import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/Context';
import {Link} from 'react-router-dom';
import {Avatar, IconButton} from '@material-ui/core';
import Button from './Button';

function ClientProfile(){
  const context = useContext(Context)
  const [ client, setClient ] = useState([])
  const [ clientFirstName, setClientFirstName ] = useState([])
  const [ clientLastName, setClientLastName ] = useState([])

  const [ count, setCount ] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3030/user/${context.verifiedUser.userInfo.user_id}`)
    .then(res => res.json())
    .then((data) => {
      setClient(data.data[0])
    })
  }, [count])

  const handleEditFirstName = (event) => {
    event.preventDefault();
    console.log("first name btn clicked")
    const editFirstName = event.target.editInput.value
    console.log(editFirstName)
    setClientFirstName({
      first_name: editFirstName
    })
    event.target.reset();
    console.log(clientFirstName)
    patchFirstName(clientFirstName)
  }

  const patchFirstName = (editInfo) => {
    const userId = client.user_id

    fetch(`http://localhost:3030/users/firstName/${userId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(editInfo)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setCount(count + 1)
    })
  }

  const handleEditLastName = (event) => {
    event.preventDefault();
    console.log("edit last btn clicked")
    const editLastName = event.target.editInput2.value
    console.log(editLastName)
    setClientLastName({
      last_name: editLastName
    })
    event.target.reset();
    console.log(clientLastName)
    patchLastName(clientLastName)
  }

  const patchLastName = (editInfo) => {
    const userId = client.user_id
    fetch(`http://localhost:3030/users/lastName/${userId}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editInfo)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setCount(count + 1)
    })
  }

    return (
      <div className="container db-social">
        <div className="image-default">
          {context.verifiedUser.userInfo.is_lawyer ? <Avatar src = {context.verifiedUser.userInfo.profile_pic_link} /> : <Avatar src = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fknowledgebase.lookseek.com%2Fimages%2FNature%2FInsects%2FButterfly%2FMonarch-Butterfly.jpg&f=1&nofb=1' className='client-pfp'/>}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-circle, rounded-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg> */}
        </div>
        <div className="infos" role="form">
          <h2>{client.first_name} {client.last_name}</h2>
        <div className="email">{client.email}</div>
          <div className='edit-forms'>
            <form onSubmit={handleEditFirstName}>
              <input placeholder='Edit first name' type="text" name="editInput" className='user-input'/>
              <Button type="submit" color="dark" className="save-btns">Save</Button>
            </form>
            <form onSubmit={handleEditLastName}>
              <input placeholder='Edit last name' type="text" name="editInput2" className='user-input'/>
              <Button type="submit" color="dark" className="save-btns">Save</Button>
            </form>
          </div>
        </div>
        <div>
        <Button color="dark" className="logout-btn"><Link to = "/" className='log-out'>Log Out</Link></Button>
        </div>
      </div>
    )
}

export default ClientProfile;
