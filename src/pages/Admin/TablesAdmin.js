import React, { useEffect, useState} from 'react'
import {HeaderPage, TablestablesAdmin, AddEditTableForm} from '../../components/Admin'
import ReactLoading from "react-loading";
import { useTable } from "../../hooks";
import { ModalBasic } from "../../components/Admin/Common";
import './TablesAdmin.scss'

export function TablesAdmin() {
    const[showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(false)
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const { loading, tables, getTables, deleteTables} = useTable(); 


    useEffect(() => {getTables()}, [refetch])
    
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev)

    const addTable = () => {
      setTitleModal('Crear mesa');
      setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch}/>);
      openCloseModal();
    }

    const updateTable = (data) => {
      setTitleModal('Actualizar mesa');
      setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} tables={data}/>);
      openCloseModal();
    }
    const onDeleteTable = async (data) => {
      const result = window.confirm(`Eliminar mesa ${data.number}?`);
      if (result) {
        await deleteTables (data.id);
        onRefetch();
      }
    }

  return (
    <>
    <HeaderPage title='Mesas' btnTitle='Crear nueva mesa' btnClick={addTable}/>
    {loading ? (
                <div>
                <div className="loader-container">
                  <ReactLoading
                    className="loader"
                    type="spin"
                    color="black"
                    height={64}
                    width={64}
                  />
                </div>
                <div className="title">
                  <p>Cargando...</p>
                </div>
              </div>
    ) : (
        <TablestablesAdmin tables={tables} updateTable={updateTable} deleteTable={onDeleteTable}/>
    )}
    <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal}/>
    </>
  )
}
