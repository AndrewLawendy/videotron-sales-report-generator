import React, { useState } from "react";
import { Container, Message } from "semantic-ui-react";

import "./style.scss";
import { RECORDS, headers } from "../../constants";
import { getLocalItem, setLocalItem } from "../../utils";

import UploadFile from "../UploadFile/UploadFile.jsx";
import AddRecord from "../AddRecord/AddRecord.jsx";
import ClearRecords from "../ClearRecords/ClearRecords.jsx";
import CopyRecords from "../CopyRecords/CopyRecords.jsx";
import RecordsFilter from "../RecordsFilter/RecordsFilter.jsx";
import RecordsTable from "../RecordsTable/RecordsTable.jsx";

const FileViewer = () => {
  const [records, setRecords] = useState(getLocalItem(RECORDS));
  const [isFiltered, setIsFiltered] = useState(false);
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(-1);

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

  return (
    <div id="file-viewer">
      <Container>
        <AddRecord
          setAddRecordModalOpen={setAddRecordModalOpen}
          setSelectedRecord={setSelectedRecord}
          addRecordModalOpen={addRecordModalOpen}
          selectedRecord={selectedRecord}
          selectedRecordIndex={selectedRecordIndex}
          updateRecords={updateRecords}
        />
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
    </div>
  );
};

export default FileViewer;
