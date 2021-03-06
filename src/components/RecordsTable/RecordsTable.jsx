import React from "react";

import { Table } from "semantic-ui-react";

import { revertStringDateFormatToDate } from "../../utils.js";
import { headers } from "../../constants";

const [callDate, , , , , , , , , , installationDate] = headers;

const RecordsTable = ({
  records,
  setSelectedRecord,
  setSelectedRecordIndex,
  setAddRecordModalOpen
}) => {
  const editRecord = (record, index) => {
    const formatRecordToFormik = record => {
      const clonedRecord = { ...record };
      clonedRecord[callDate] = revertStringDateFormatToDate(
        clonedRecord[callDate]
      );
      clonedRecord[installationDate] = revertStringDateFormatToDate(
        clonedRecord[installationDate]
      );

      return clonedRecord;
    };

    const formattedRecords = formatRecordToFormik(record);
    setSelectedRecord(formattedRecords);
    setSelectedRecordIndex(index);
    setAddRecordModalOpen(true);
  };

  return (
    <div className="table-wrapper">
      <Table singleLine striped selectable>
        <Table.Header>
          <Table.Row>
            {headers.map((header, index) => (
              <Table.HeaderCell key={`row-${index}`}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {records.map((row, rowIndex) => (
            <Table.Row
              key={`row-${rowIndex}`}
              onClick={() => editRecord(row, rowIndex)}
            >
              {headers.map((header, cellIndex) => (
                <Table.Cell key={`cell-${rowIndex}-${cellIndex}`}>
                  {row[header]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RecordsTable;
