import React, {useEffect, useState} from 'react'
import { HeaderPage, TableProductAdmin, AddEditProductForm } from '../../components/Admin';
import ReactLoading from "react-loading";
import { useProduct } from "../../hooks";
import { ModalBasic } from "../../components/Admin/Common";

export function ProductAdmin() {

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)
  const { loading, product, getProducts, deleteProduct} = useProduct();
  
  useEffect(() => {
    getProducts()
  }, [refetch]);
  
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal('Nuevo producto')
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch}/>
      );
      openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal('Actualizar Produto');
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={data}/>
    );
    openCloseModal();
  }


  const onDeleteProduct = async (data) => {
    const result = window.confirm(`Eliminar producto ${data.title}?`)
    if (result) {
      await deleteProduct(data.id)
      onRefetch();
    }
  }
  return (
    <>
        <HeaderPage title='Productos' btnTitle='Nuevo producto' btnClick={addProduct}/>

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
          <TableProductAdmin product={product} updateProduct={updateProduct} deleteProduct={onDeleteProduct}/>
        )}
        <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal}/>
    </>
  )
}
