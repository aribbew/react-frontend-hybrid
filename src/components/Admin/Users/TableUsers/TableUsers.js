import React from 'react'
import './_TableUsers.scss'
import { map } from "lodash";
import { Table, TableHead, TableRow, TableCell, TableContainer, TableBody, Button } from '@mui/material';
import { AiOutlineCheck , AiOutlineClose} from 'react-icons/ai';
import {HiOutlinePencil} from 'react-icons/hi';

export function TableUsers(props) {
    const{ users, updateUser, onDeleteUser } = props;
      return (
        <TableContainer className='font'>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Activo</TableCell>
                    <TableCell>Staff</TableCell>
                    <TableCell></TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                {map(users,(user, index) =>(
                    <TableRow key={index}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell className='status'>{user.is_active ? <AiOutlineCheck className="check"/> : <AiOutlineClose className="close"/>}</TableCell>
                        <TableCell className='status'>{user.is_staff ? <AiOutlineCheck className="check"/> : <AiOutlineClose className="close"/>}</TableCell>
                        <Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
          )
        }

        function Actions(props) {
            const {user, updateUser, onDeleteUser} = props;
            return(
                <TableCell>
                    <Button onClick={() => updateUser(user)}>
                    <HiOutlinePencil/>
                    </Button>
                    <Button onClick={() => onDeleteUser(user) }>
                    <AiOutlineClose className="close"/>
                    </Button>
                </TableCell>
            )
        }