import Types from "prop-types"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
export const UserList = ({users , onDelete , onSalary}) => {

    const handleDelete = (id) => {
      
        axios.delete(`http://localhost:3004/users/${id}`)
          .then(() => {
            
            onDelete(id)
            toast.success('User deleted successfully')
          })
          .catch(() => {
            toast.error('Error deleting user')
          })
      }

      const handleSalaryUp = (id, currentSalary) => {
        
        axios.put(`http://localhost:3004/users/${id}`, { salary: currentSalary + 50000 })
          .then(() => {
           onSalary(id,currentSalary)
            toast.success('User salary updated successfully')
          })
          .catch(() => {
            toast.error('Error updating user salary')
          })
      };

    
    return <div>
        <h1>UserList</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>salary</th>
                    <th>actions</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    users.map(elm =>  <tr key = {elm.id}   style={{ backgroundColor: elm.salary > 800000 ? "blue" : "black" }}>
                     
                        <td>{elm.id}</td>
                        <td>{elm.name}</td>
                        <td>{elm.surname}</td>
                        <td>{elm.salary}</td>
                        <td>{elm.actions}
                       
                        </td>
                        <button onClick={() => handleDelete(elm.id)}>Delete</button>
                        <button onClick={() => handleSalaryUp(elm.id, parseInt(elm.salary))}>Increase Salary</button>
                
                    </tr>)
                }
            </tbody>
        </table>
    </div>
}
UserList.propTypes = {
    users:Types.arrayOf(Types.exact({
        id:Types.string,
        name:Types.string,
        surname:Types.string,
        salary:Types.string
    } ))

}

UserList.propTypes = {
  onDelete:Types.func,
  onSalary:Types.func
}