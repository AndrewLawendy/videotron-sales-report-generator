import React from "react";
import { Button, Modal, Message } from "semantic-ui-react";
import { store } from "react-notifications-component";

import AddRecordFrom from "../AddRecordForm/AddRecordForm.jsx";

import { getLocalItem, getDateFormat, formatPhoneNumber } from "../../utils";
import { RECORDS, EMPLOYEE } from "../../constants";

const AddRecord = ({
  setAddRecordModalOpen,
  setSelectedRecord,
  addRecordModalOpen,
  selectedRecord,
  selectedRecordIndex,
  updateRecords
}) => {
  const showAddRecordSuccess = content => {
    store.addNotification({
      content: (
        <Message success icon="check" header="Succès" content={content} />
      ),
      container: "bottom-right",
      animationOut: ["animationOut"],
      dismiss: {
        duration: 3000
      }
    });
  };

  const formatRecord = record => {
    const clonedRecord = { ...record };
    clonedRecord["Date d'appel"] = getDateFormat(clonedRecord["Date d'appel"]);
    clonedRecord["Date d'installation ou livraison"] = getDateFormat(
      clonedRecord["Date d'installation ou livraison"]
    );
    clonedRecord["Numéro de téléphone"] = formatPhoneNumber(
      clonedRecord["Numéro de téléphone"]
    );

    if (clonedRecord["Produit vendu"] === "RTMO")
      delete clonedRecord["Numéro de compte Hélix"];

    return clonedRecord;
  };

  const submitRecord = values => {
    const records = getLocalItem(RECORDS);
    if (selectedRecord == undefined) {
      const employee = getLocalItem(EMPLOYEE);
      const newRecord = formatRecord({ ...employee, ...values });
      records.push(newRecord);
      showAddRecordSuccess("Votre vente est ajoutée avec succès");
    } else {
      const newRecord = formatRecord(values);
      records.splice(selectedRecordIndex, 1, newRecord);
      showAddRecordSuccess("Votre vente est mise à jour avec succès");
    }
    updateRecords(records);

    setAddRecordModalOpen(false);
    setSelectedRecord(undefined);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setAddRecordModalOpen(true)} positive>
        Ajouter nouvelle Vente
      </Button>

      <Modal
        closeIcon
        dimmer={"blurring"}
        centered={false}
        onClose={() => {
          setAddRecordModalOpen(false);
          setSelectedRecord(undefined);
        }}
        open={addRecordModalOpen}
      >
        <Modal.Header>Veuillez remplir les détails de votre vente</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <AddRecordFrom record={selectedRecord} onSubmit={submitRecord} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};

export default AddRecord;
