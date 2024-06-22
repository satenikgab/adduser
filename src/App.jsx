import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])

  const addItem = obj => {
    setUsers([...users , obj])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))

  }

  const salaryUp = ( id, currentSalary ) => {
     setUsers(users.map(user => user.id === id ? { ...user, salary: currentSalary + 50000 } : user))
   
  }
  
  useEffect(() => {
    axios
    .get("http://localhost:3004/users")
    .then(res => {
      setUsers(res.data)
   
    })
  },[])
  return (
    <div className='row'>
      <AddUser 
        onAdd = {addItem}
      
      />
      <ToastContainer
        />
      <UserList
         users={users} onDelete = {deleteUser} onSalary = {salaryUp}
      />
    </div>
  )
}

export default App
