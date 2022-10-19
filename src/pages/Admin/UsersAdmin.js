import { React, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useUser } from "../../hooks";
import {
  HeaderPage,
  TableUsers,
  ModalBasic,
  AddEditUserForm,
} from "../../components/Admin";
import "./UserAdmin.scss";

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefetch] = useState(false)
  const [contentModal, setContentModal] = useState(null);
  const { loading, users, getUsers, deleteUser} = useUser();

  useEffect(() => {getUsers()}, [refetch]); 
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev)

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(<AddEditUserForm onClose={openCloseModal}  onRefetch={onRefetch}/>);
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar Usuario");
    setContentModal(<AddEditUserForm onClose={openCloseModal}  onRefetch={onRefetch} user={data}/>);
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`Eliminar usuario ${data.email}?`);

    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser} /* btnTitleTwo='Eliminar Usuario'*/
      />
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
        <TableUsers users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
