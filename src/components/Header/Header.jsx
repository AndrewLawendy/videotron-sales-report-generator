import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";

import "./style.scss";

import NameAndPr from "../../components/NameAndPr/NameAndPr.jsx";
import { headers, EMPLOYEE } from "../../constants";
import { getLocalItem, setLocalItem } from "../../utils";

const [, pr, agentName] = headers;

const Header = () => {
  const [modalOpen, setModelOpen] = useState(false);
  const [employee, updateEmployee] = useState({});

  const getNameAndPr = async () => {
    const nameAndPr = await getLocalItem(EMPLOYEE);
    if (nameAndPr != null) {
      updateEmployee(nameAndPr);
    } else {
      setModelOpen(true);
    }
  };

  useEffect(() => {
    const getNameAndPrFn = getNameAndPr;

    getNameAndPrFn();
  }, []);

  const submit = values => {
    setLocalItem(EMPLOYEE, values);
    updateEmployee(values);
    setModelOpen(false);
  };

  return (
    <React.Fragment>
      <header>
        <h2>
          {employee[agentName]}, {employee[pr]}
        </h2>
        <Button
          className="edit-btn"
          content="Modifier Nom ou Pr"
          icon="edit"
          labelPosition="left"
          onClick={() => setModelOpen(true)}
        />
      </header>
      <Modal
        dimmer={"blurring"}
        centered={false}
        closeOnEscape={Object.keys(employee).length > 0}
        closeOnDimmerClick={Object.keys(employee).length > 0}
        closeIcon={Object.keys(employee).length > 0}
        onClose={() => setModelOpen(false)}
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
