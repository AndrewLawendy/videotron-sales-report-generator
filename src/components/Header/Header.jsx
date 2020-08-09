import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";

import "./style.scss";

import Logo from "../../assets/logo-videotron-icon.png";
import NameAndPr from "../../components/NameAndPr/NameAndPr";
import { EMPLOYEE } from "../../constants";

const Header = () => {
  const [modalOpen, setModelOpen] = useState(false);
  const [employee, updateEmployee] = useState(null);

  const getNameAndPr = () => {
    const nameAndPr = localStorage.getItem(EMPLOYEE);
    if (nameAndPr != null) {
      const nameAndPrObject = JSON.parse(nameAndPr);
      updateEmployee(nameAndPrObject);
    } else {
      setModelOpen(true);
    }
  };

  useEffect(getNameAndPr, []);

  const submit = values => {
    const stringifiedValues = JSON.stringify(values);
    localStorage.setItem(EMPLOYEE, stringifiedValues);
    updateEmployee(values);
    setModelOpen(false);
  };

  return (
    <React.Fragment>
      <header>
        <div className="profile">
          <div className="logo-container">
            <img src={Logo} alt="Videotron Logo" />
          </div>
          <h2>
            {employee?.firstName}, {employee?.pr}
          </h2>
        </div>
        <Button
          className="edit-btn"
          content="Modifier Nom ou Pr"
          icon="edit"
          labelPosition="left"
          onClick={() => setModelOpen(true)}
        />
      </header>
      <Modal
        centered={false}
        closeOnEscape={!!employee}
        closeOnDimmerClick={!!employee}
        onClose={() => setModelOpen(false)}
        onOpen={() => setModelOpen(true)}
        open={modalOpen}
      >
        <Modal.Header>Veuillez remplir votre Nom et PR</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <NameAndPr submit={submit} employee={employee} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default Header;
