import React, { useState } from "react";
import { Button, Table, Message, Confirm } from "semantic-ui-react";

import "./style.scss";

import xlsxParser from "xlsx-parse-json";

const FileViewer = () => {
  const [records, setRecords] = useState(getLocaleRecords());
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const headers = records.length > 0 ? Object.keys(records[0]) : [];

  function getLocaleRecords() {
    const stringRecords = localStorage.getItem("records");
    return stringRecords != null ? JSON.parse(stringRecords) : [];
  }

  function setLocalRecords(records) {
    const stringRecords = JSON.stringify(records);
    localStorage.setItem("records", stringRecords);
    setRecords(records);
  }

  function updateRecords(records) {
    setLocalRecords(records);
  }

  function clearRecords() {
    setLocalRecords([]);
  }

  const parse = event => {
    const file = event.target.files[0];
    xlsxParser.onFileSelection(file).then(data => {
      const firstSheet = Object.keys(data)[0];
      updateRecords(data[firstSheet]);
    });
  };

  return (
    <div id="file-viewer">
      <div>
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
        <Button positive>Ajouter nouvelle Vente</Button>
      </div>

      {records.length > 0 ? (
        <Table singleLine>
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
                {Object.keys(row).map((key, index) => {
                  const cell = row[key];
                  return <Table.Cell key={`cell-${index}`}>{cell}</Table.Cell>;
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Message
          info
          header="Pas encore de vents?"
          content='Clickez sur "Telecharger un fichier actuel" ou "Ajouter nouvelle Vente" pour commencer.'
        />
      )}

      <Confirm
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
    </div>
  );
};

export default FileViewer;
