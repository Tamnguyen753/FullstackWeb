import Modal from "antd/es/modal/Modal";
import useBoolean from "../../../../hooks/useBoolean";
import ModalCreate from "./ModalCreate";
import { Button } from "antd";
import { useContext } from "react";
import AppContext from "antd/es/app/context";

  const Admin = () => {
    const { user } = useContext(AppContext);
    // const { logOut } = useAuth();
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
    return (
      <div className="user-info">
        {/* <p>{user.username}</p> */}
        <ButtonCreatePost />
        {/* <Button type="primary" danger onClick={logOut}>
          Logout
        </Button> */}
      </div>
    );
  };
  
  export default Admin;