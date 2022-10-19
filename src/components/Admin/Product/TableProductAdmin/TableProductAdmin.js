import React from 'react'
import './_TableProductAdmin.scss'
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Button } from '@mui/material';
import { map } from "lodash";
import { Image } from 'semantic-ui-react';
import { AiOutlineCheck , AiOutlineClose} from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';



export function TableProductAdmin(props) {
  const {product, updateProduct, deleteProduct} = props
  return (
    <TableContainer className='font'>
    <Table>
        <TableHead>
            <TableRow className='containerTable'>
                <TableCell width={100} className='margin'>Imagen</TableCell>
                <TableCell width={100} className='margin'>Producto</TableCell>
                <TableCell width={100} className='margin'>Precio</TableCell>
                <TableCell width={100} className='margin'>Categoria</TableCell>
                <TableCell width={100} className='margin'>Activo</TableCell>
                <TableCell width={100} className='margin'></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {map(product,(product, index) =>(
                <TableRow key={index}>
                    <TableCell width={100}><Image src={product.image}/></TableCell>
                    <TableCell width={100}>{product.title}</TableCell>
                    <TableCell width={100}>RD${product.price}</TableCell>
                    <TableCell width={100}>{product.category_data.title}</TableCell>
                    <TableCell width={100}>{product.active ? <AiOutlineCheck className="check"/> : <AiOutlineClose className="close"/>}</TableCell>
                    <Actions product={product} updateProduct={updateProduct} deleteProduct={deleteProduct}/>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
  )
}

function Actions(props) {
  const {product, updateProduct, deleteProduct} = props;
  return(
      <TableCell>
          <Button onClick={() => updateProduct(product)}>
          <HiOutlinePencil/>
          </Button>
          <Button onClick={() => deleteProduct(product)}>
          <AiOutlineClose className="close"/>
          </Button>
      </TableCell>
  )
}