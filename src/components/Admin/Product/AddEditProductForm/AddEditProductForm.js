import React, {useState, useEffect, useCallback} from 'react'
import {map} from "lodash";
import './AddEditProductForm.scss'
import "react-widgets/scss/styles.scss";
import {  InputBase, Button, FormControlLabel } from '@mui/material';
import { Checkbox, Image } from 'semantic-ui-react'
import { useCategory, useProduct } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import Combobox from "react-widgets/Combobox";
import {useDropzone} from 'react-dropzone';


export function AddEditProductForm(props) {
    const{onClose, onRefetch, product} = props;
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(product ? product?.image : null)
    const {categories, getCategories} = useCategory();
    const {addProduct, updateProduct} = useProduct();

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
      setCategoriesFormat(formatDropdownData(categories))
    }, [categories])
    
    const onDrop = useCallback(async(acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file)
        setPreviewImage(URL.createObjectURL(file))
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object (product ? updateSchame() : newSchame()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (product) await updateProduct(product.id, formValue);
                else await addProduct(formValue)
                onRefetch();
                onClose();
            } catch (error) {
                throw error  
            }


        }
    });

    return (
    
     <form onSubmit={formik.handleSubmit} className='form'>
        
    
        <InputBase name='title'placeholder='Nombre del producto' className='Input-mui' value={formik.values.title} onChange={formik.handleChange} />
        <InputBase type='number'name='price'placeholder='Precio' className='Input-mui' value={formik.values.price} onChange={formik.handleChange} />
        <div className="dropdown">
        <Combobox   
        placeholder='Selecciona una categoria'
        data={categoriesFormat}
        dataKey='key'
        textField='text'
        value={formik.values.category}
        onChange={(data, _) => formik.setFieldValue('category',data.value)}/>
        </div>
        <div className="checkbox">
        <FormControlLabel control={<Checkbox toggle checked={formik.values.active}  onChange={(_, data) => formik.setFieldValue('active',data.checked)}/>} label='Producto Activo'/>
        </div>
        <div className='button-container2'>
        <Button type='button'{...getRootProps()}>
            {previewImage ? 'Cambiar imagen' : 'Subir Imagen'}
        </Button>
        <input {...getInputProps()}/>
        </div>
        <Image src={previewImage} className='image-button2'/>
        <div className='button-container'>
    <Button type='submit' className='button'>
        {product ? 'Actualizar' : 'Crear'}
    </Button>
        </div>
    </form>
  
  )
}


function formatDropdownData (data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id,
    }));
}



function initialValues(data) {
    return{
        title: data?.title || '',
        price: data?.price || '',
        category: data?.category || '',
        active: data?.active ? true : false,
        image: '',
    }
}

function newSchame() {
    return{
        title: Yup.string().required(true),
        price: Yup.string().required(true), 
        category: Yup.string().required(true),
        active: Yup.bool(),
        image: Yup.string().required(true),
    }
}

function updateSchame() {
    return{
        title: Yup.string().required(true),
        price: Yup.string().required(true), 
        category: Yup.string().required(true),
        active: Yup.bool(),
        image: Yup.string(),
    }
}