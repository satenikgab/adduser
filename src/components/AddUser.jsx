import axios from "axios"
import { useForm } from "react-hook-form"
import Types from "prop-types"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const AddUser = ({onAdd}) => {

    const schema = yup.object().shape({
        name: yup.string().min(2).required("Please fill your name"),
        surname: yup.string().min(6).max(32).required("Please fill your surname"),
        salary: yup.number().min(5).required("Please fill your salary"),
      })

    const {register , handleSubmit , formState:{errors} ,reset} = useForm({resolver: yupResolver(schema)})

    const handleAdd = data => {
        axios
        .post("http://localhost:3004/users" , data)
        .then(res => {
            onAdd (res.data)
            reset()
        })

    }

  
    return <div>
        <h1>AddUser</h1>
        <form onSubmit={handleSubmit(handleAdd)}>
            
            {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
            <label>name</label>
            <input
            {...register("name")}

            />
            {errors.surname && <p style={{color:"red"}}>{errors.surname.message}</p>}
            <label>surname</label>
            <input
            {...register("surname")}

            />
             {errors.salary && <p style={{color:"red"}}>{errors.salary.message}</p>}
            <label>salary</label>
            <input
            {...register("salary" )}

            />

           <button>save</button>
        </form>
    </div>
}

AddUser.propTypes = {
    onAdd:Types.func.required
}