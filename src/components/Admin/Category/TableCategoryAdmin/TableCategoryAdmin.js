import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Button } from '@mui/material';
import { Image } from 'semantic-ui-react'
import { map } from "lodash";
import './TableCategoryAdmin.scss'
import {HiOutlinePencil} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';

export function TableCategoryAdmin(props) {
const {categories, updateCategory, deleteCategory} = props;

    return (
        <TableContainer className='font'>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Categoria</TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                {map(categories,(category, index) =>(
                    <TableRow key={index}>
                        <TableCell width={250}> <Image src={category.image} size='small'/> </TableCell>
                        <TableCell>{category.title}</TableCell>
                        <Actions category={category} updateCategory={updateCategory} deleteCategory={deleteCategory}/>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
  )
}

function Actions(props) {
    const {category, updateCategory, deleteCategory} = props;

    return(
        <TableCell>
            <Button onClick={() => updateCategory(category)}>
                <HiOutlinePencil/>
            </Button>
            <Button onClick={() => deleteCategory(category)}>
                    <AiOutlineClose className="close"/>
                    </Button>
        </TableCell>
    )
}
