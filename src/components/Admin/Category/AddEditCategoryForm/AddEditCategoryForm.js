import React, { useState, useCallback } from 'react';
import { InputBase, Button } from '@mui/material';
import {useDropzone} from 'react-dropzone';
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useCategory} from '../../../../hooks'
import { Image } from 'semantic-ui-react';

export function AddEditCategoryForm(props) {
    const {onClose, onRefetch, category} = props;
    const [previewimage, setpreviewImage] = useState(category?.image || null);
    const {addCategory, updateCategory} = useCategory(); 

    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formvalue) => {
            try {
                if(category) await updateCategory(category.id, formvalue);
                else await addCategory(formvalue);
                onClose();
                onRefetch();
            } catch (error) {
                console.error(error)
            }
        }
    });

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file)
        setpreviewImage(URL.createObjectURL(file))
    }, []);
    const {getRootProps, getInputProps} = useDropzone({
        noKeyboard: true,
        multiple: false,
        onDrop,
    })
  return (
    <form onSubmit={formik.handleSubmit}>
           <InputBase name='title'placeholder='Nombre de la categoria' className='Input-mui' value={formik.values.title} onChange={formik.handleChange}/> 
           <div className="button-container">
           <Button type='button' className='push' {...getRootProps()}>
            {previewimage ? 'Cargar Imagen' : 'Subir Imagen'}
            </Button>
           </div>
            <input {...getInputProps()}/>
            <Image src={previewimage}/>
            <div className="button-container">
            <Button type='submit' className='button'>
            {category ? 'Actualizar' : 'Crear'}
            </Button>
            </div>
    </form>
  )
}

function initialValues(data) {
    return{
        title: data?.title || '',
        image: '',
    }
}

function newSchema(){
    return{
        title: Yup.string().required(true),
        image: Yup.string().required(true)
    }
}

function updateSchema(){
    return{
        title: Yup.string().required(true),
        image: Yup.string(),
    }
}