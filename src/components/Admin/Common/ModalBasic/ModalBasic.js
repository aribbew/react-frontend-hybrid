import {React} from 'react'
import './_ModalBasic.scss'
import {Modal, Box, Typography} from '@mui/material';

export function ModalBasic(props) {
   const {show, title, children, onClose} = props;
  return (
    
  <Modal className='modal-basic' open={show} onClose={onClose}>
        <Box className='modal'>
          <div className='logo-container'>
            
            <div className='logo'>
              
            </div>
          </div>
          <div className='title-container'>
            {title &&<Typography className='title' component={'span'}>{title}</Typography>}
          </div>
            <Typography className='subtitle' component={'span'}>{children}</Typography>
        </Box>
  </Modal>
  )
}
