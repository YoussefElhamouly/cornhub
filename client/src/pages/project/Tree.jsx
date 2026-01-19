import React, { useState } from "react";
import Navbar from "../../components/layouts/navbar/Navbar.jsx";
import Modal from "../../components/feature/modal/Modal.jsx";
import InputField from "../../components/ui/inputField/InputField.jsx";
import Menu from "../../components/ui/menu/Menu.jsx";
const Tree = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Navbar />
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        try modal
      </button>
      {modal && (
        <Modal
          title="Edit your personal shit"
          onClose={() => {
            setModal(false);
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <InputField label={"Project name"} sublabel={"(your shit)"} />{" "}
            <InputField label={"Project name"} />{" "}
            <InputField label={"Project name"} />
            <Menu />
            <Menu />
          </form>
        </Modal>
      )}
    </>
  );
};

export default Tree;
