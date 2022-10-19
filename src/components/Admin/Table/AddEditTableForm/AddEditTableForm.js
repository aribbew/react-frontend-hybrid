import React from 'react'
import {  InputBase, Button } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";
import './_AddEditTableForm.scss'

export function AddEditTableForm(props) {
    const {onClose, onRefetch, tables} = props;
    const {addTables, updateTables} = useTable();

    const formik = useFormik({
        initialValues: initialValues(tables),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            if (tables) await updateTables(tables.id, formValue);
            else await addTables(formValue);
            onRefetch();
            onClose();
        }
    });
  
    return (
    <form  onSubmit={formik.handleSubmit} className='form'>
    <InputBase name='number' type='number' placeholder='Numero de la mesa' value={formik.values.number} onChange={formik.handleChange} className='Input-mui'/>
    <div className='button-container'>
    <Button type='submit' className='button'>
        {tables ? 'Actualizar': 'Crear'}
</Button>
    </div>
</form>
  )
}


function initialValues(data) {
    return{
        number: data?.nunber || '',
    }
}

function validationSchema() {
    return{
        number: Yup.number().required(true),
    }
}