import {React } from 'react'
import './_AddEditUserForm.scss'
import {  InputBase, FormControlLabel, Button } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from 'semantic-ui-react'
import { useUser } from "../../../../hooks";

export function AddEditUserForm(props) {

    const {onClose, onRefetch, user} = props;
    const {addUser, updateUser} = useUser();
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateSchame() : newSchame()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
         try {
            if (user) await updateUser(user.id, formValue)
            else await addUser(formValue)
            onRefetch();
            onClose();
        } catch (error) {
            console.error(error)
         }
        }
    });
    return (
    <form onSubmit={formik.handleSubmit} className='form'>
        <InputBase name='username'placeholder='Nombre de usuario' className='Input-mui' value={formik.values.username} onChange={formik.handleChange}/>
        <InputBase name='email'placeholder='Email' className='Input-mui' value={formik.values.email} onChange={formik.handleChange}/>
        <InputBase name='first_name'placeholder='Nombre' className='Input-mui' value={formik.values.first_name} onChange={formik.handleChange}/>
        <InputBase name='last_name'placeholder='Apellido' className='Input-mui' value={formik.values.last_name} onChange={formik.handleChange}/>
        <InputBase name='password'placeholder='Contraseña' className='Input-mui' value={formik.values.password} onChange={formik.handleChange}/>
        <div className="add-edit-active">
        <FormControlLabel control={<Checkbox toggle checked={formik.values.is_active} onClick={(_, data) => formik.setFieldValue('is_active', data.checked)}/>} label='Usuario Activo'/>
        </div>
        <div className="add-edit-active">
        <FormControlLabel control={<Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue('is_staff', data.checked)}/>} label='Usuario administrador'/>
        </div>
        <div className='button-container'>
    <Button type='submit' className='button'>
        {user ? 'Actualizar': 'Crear'}
    </Button>
        </div>
    </form>
  )
}


function initialValues(data) {
    return{
        username: data?.username || '',
        email: data?.email || '',
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        password: '',
        is_active: data?.is_active ? true : false,
        is_staff: data?.is_staff ? true : false,
    }
}

function newSchame() {
    return{
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true), 
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required(true),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}

function updateSchame() {
    return{
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true), 
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}