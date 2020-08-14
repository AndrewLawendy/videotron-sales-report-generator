import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  Message,
  Confirm,
  Modal
} from "semantic-ui-react";
import xlsxParser from "xlsx-parse-json";
import select from "select";
import { store } from "react-notifications-component";

import "./style.scss";
import { RECORDS, EMPLOYEE, headers } from "../../constants";
import {
  getLocalItem,
  setLocalItem,
  getDateFormat,
  formatPhoneNumber,
  clearSelection
} from "../../utils";
import AddRecord from "../AddRecord/AddRecord.jsx";

const FileViewer = () => {
  const [records, setRecords] = useState(getLocalItem(RECORDS));
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);

  const showAddRecordSuccess = () => {
    store.addNotification({
      content: (
        <Message
          success
          icon="check"
          header="Succes"
          content="Votre vente est ajoutée avec succès"
        />
      ),
      container: "bottom-right",
      animationOut: ["animationOut"],
      dismiss: {
        duration: 3000
      }
    });
  };

  const showCopySuccess = () => {
    store.addNotification({
      content: <Message info icon="check" header="Copié" />,
      container: "bottom-right",
      animationOut: ["animationOut"],
      dismiss: {
        duration: 1700
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

  function clearRecords() {
    setLocalItem(RECORDS, []);
    setRecords([]);
  }

  const parse = event => {
    const { target } = event;
    const file = target.files[0];
    xlsxParser.onFileSelection(file).then(data => {
      const firstSheet = Object.keys(data)[0];
      updateRecords(data[firstSheet]);
      target.value = "";
    });
  };

  const formatRecord = record => {
    const clonedRecord = { ...record };
    clonedRecord["Date d'appel"] = getDateFormat(clonedRecord["Date d'appel"]);
    clonedRecord["Date de l'installationOu livraison"] = getDateFormat(
      clonedRecord["Date de l'installationOu livraison"]
    );
    clonedRecord["Numéro de téléphone"] = formatPhoneNumber(
      clonedRecord["Numéro de téléphone"]
    );

    if (clonedRecord["PRODUIT VENDU"] === "RTMO")
      delete clonedRecord["Numéro de compte Hélix"];

    return clonedRecord;
  };

  const submitRecord = values => {
    const records = getLocalItem(RECORDS);
    const employee = getLocalItem(EMPLOYEE);
    const newRecord = formatRecord({ ...employee, ...values });
    records.push(newRecord);
    updateRecords(records);

    setAddRecordModalOpen(false);
    showAddRecordSuccess();
  };

  const copyRecords = () => {
    const tbody = document.querySelector("tbody");
    select(tbody);
    document.execCommand("copy");
    clearSelection();
    showCopySuccess();
  };

  return (
    <div id="file-viewer">
      <Container>
        <Button onClick={() => setAddRecordModalOpen(true)} positive>
          Ajouter nouvelle Vente
        </Button>
        <input
          disabled={records.length > 0}
          type="file"
          id="addActualFile"
          onChange={parse}
        />
        <label
          className={`ui secondary button ${
            records.length > 0 ? "disabled" : ""
          }`}
          htmlFor="addActualFile"
        >
          Telecharger un fichier actuel
        </label>
        <Button
          onClick={() => {
            setRemoveDialogOpen(true);
          }}
          negative
          disabled={records.length === 0}
        >
          Vider le fichier
        </Button>
        <Button
          primary
          content="Copier"
          icon="copy outline"
          labelPosition="left"
          onClick={copyRecords}
        />
        {records.length == 0 && (
          <Message
            info
            header="Pas encore de ventes?"
            content='Clickez sur "Telecharger un fichier actuel" ou "Ajouter nouvelle Vente" pour commencer.'
          />
        )}
      </Container>

      <Container className="table-container" fluid>
        {records.length > 0 && (
          <div className="table-wrapper">
            <Table singleLine striped selectable>
              <Table.Header>
                <Table.Row>
                  {headers.map((header, index) => (
                    <Table.HeaderCell key={`row-${index}`}>
                      {header}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {records.map((row, index) => (
                  <Table.Row key={`row-${index}`}>
                    {headers.map((header, index) => (
                      <Table.Cell key={`cell-${index}`}>
                        {row[header]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Container>

      <Confirm
        className="confirm"
        centered={false}
        size="large"
        open={removeDialogOpen}
        content="Vous allez supprimer toutes les ventes enregistrées, voulez-vouz continuer?"
        cancelButton="Non"
        confirmButton="Oui"
        onCancel={() => {
          setRemoveDialogOpen(false);
        }}
        onConfirm={() => {
          setRemoveDialogOpen(false);
          clearRecords();
        }}
      />

      <Modal
        closeIcon
        dimmer={"blurring"}
        centered={false}
        onClose={() => setAddRecordModalOpen(false)}
        open={addRecordModalOpen}
      >
        <Modal.Header>Veuillez remplir les détails de votre vente</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <AddRecord onSubmit={submitRecord} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default FileViewer;
