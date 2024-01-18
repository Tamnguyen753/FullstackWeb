import Modal from "antd/es/modal/Modal";
import useBoolean from "../../../../hooks/useBoolean";
import ModalCreate from "./ModalCreate";
import { Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../../App";
import styled from "styled-components";

const StyledAdmin = styled.div`
  position: fixed;
  top: 3;
  left: 0;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100; 
`;
const useUserContext = () => {
  const { user } = useContext(AppContext)
  return user;
};
const Admin = () => {
  const ButtonCreatePost = () => {
    const { value: isOpen, setFalse, setTrue } = useBoolean();
    return (
      <>
        <Button type="primary" onClick={setTrue}>
          Create
        </Button>
        <Modal title="New post" open={isOpen} onCancel={setFalse} footer={false}>
          <ModalCreate close={setFalse} />
        </Modal>
      </>
    );
  };
  const user1 = useUserContext();
  return (
    <StyledAdmin>
    <div className="user-info">
      {user1 && user1.username === "admin" ? <ButtonCreatePost /> : null}
    </div>
    </StyledAdmin>
  );
};

export default Admin;
