import React, { useState } from "react";
import { Container, Button, Message, Modal } from "semantic-ui-react";
import { store } from "react-notifications-component";

import "./style.scss";
import { RECORDS, EMPLOYEE, headers } from "../../constants";
import {
  getLocalItem,
  setLocalItem,
  getDateFormat,
  formatPhoneNumber
} from "../../utils";
import AddRecord from "../AddRecord/AddRecord.jsx";
import RecordsFilter from "../RecordsFilter/RecordsFilter.jsx";
import RecordsTable from "../RecordsTable/RecordsTable.jsx";
import UploadFile from "../UploadFile/UploadFile.jsx";
import ClearRecords from "../ClearRecords/ClearRecords.jsx";
import CopyRecords from "../CopyRecords/CopyRecords.jsx";

const FileViewer = () => {
  const [records, setRecords] = useState(getLocalItem(RECORDS));
  const [isFiltered, setIsFiltered] = useState(false);
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(-1);

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

  function updateRecords(records) {
    const formattedRecords = records.map(row => {
      return headers.reduce((acc, curr) => {
        acc[curr] = row[curr] || "N/A";
        return acc;
      }, {});
    });
    setLocalItem(RECORDS, formattedRecords);
    setRecords(formattedRecords);
  }

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
    <div id="file-viewer">
      <Container>
        <Button onClick={() => setAddRecordModalOpen(true)} positive>
          Ajouter nouvelle Vente
        </Button>
        <UploadFile
          noRecords={records.length > 0}
          isFiltered={isFiltered}
          updateRecords={updateRecords}
        />
        <ClearRecords disabled={records.length === 0} setRecords={setRecords} />
        <CopyRecords disabled={records.length === 0} />

        <RecordsFilter setRecords={setRecords} setIsFiltered={setIsFiltered} />
        {!isFiltered && records.length == 0 && (
          <Message
            info
            header="Pas encore de ventes?"
            content='Clickez sur "Telecharger un fichier actuel" ou "Ajouter nouvelle Vente" pour commencer.'
          />
        )}

        {isFiltered && records.length == 0 && (
          <Message
            info
            header="Pas encore de ventes filtrées?"
            content="Changer les options de filtrage afin d'afficher vos ventes"
          />
        )}
      </Container>

      <Container className="table-container" fluid>
        {records.length > 0 && (
          <RecordsTable
            records={records}
            setSelectedRecord={setSelectedRecord}
            setSelectedRecordIndex={setSelectedRecordIndex}
            setAddRecordModalOpen={setAddRecordModalOpen}
          />
        )}
      </Container>

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
            <AddRecord record={selectedRecord} onSubmit={submitRecord} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default FileViewer;
