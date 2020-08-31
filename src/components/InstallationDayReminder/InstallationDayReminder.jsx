import React, { useState, useEffect } from "react";
import { Table, Modal } from "semantic-ui-react";

import { headers, RECORDS, recordsStore } from "../../constants";
import { getLocalItem, getDateFormat } from "../../utils";
const [
  ,
  ,
  ,
  ,
  ,
  ,
  soldProducts,
  ,
  clicAccountNumber,
  ,
  installationDate
] = headers;

const InstallationDayReminder = () => {
  const [todaysRecords, setTodaysRecords] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const reminderDate = new Date().setHours(14, 0, 0, 0);

  const isEarly = reminder => {
    return reminder > new Date().getTime();
  };

  const checkTodaysRecords = async () => {
    const allRecords = await getLocalItem(RECORDS, recordsStore);
    const formattedDate = getDateFormat(new Date());
    const filteredRecords = allRecords.filter(
      record => record[installationDate] == formattedDate
    );

    setTodaysRecords(filteredRecords);
    setOpenModal(true);

    setTimeout(checkTodaysRecords, 24 * 60 * 60 * 1000); // Every day
  };

  const initPage = () => {
    let timeDifference;
    if (isEarly(reminderDate)) {
      timeDifference = reminderDate - new Date().getTime();
    } else {
      const tomorrowsReminder = new Date().setHours(38, 0, 0, 0);
      timeDifference = tomorrowsReminder - new Date().getTime();
    }
    setTimeout(checkTodaysRecords, timeDifference);
  };

  useEffect(initPage, []);

  return (
    <Modal
      closeIcon
      dimmer={"blurring"}
      centered={false}
      onClose={() => {
        setOpenModal(false);
      }}
      open={openModal}
    >
      <Modal.Header>Installation du jour</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Table singleLine striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{clicAccountNumber}</Table.HeaderCell>
                <Table.HeaderCell>{soldProducts}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {todaysRecords.map((record, rowIndex) => (
                <Table.Row key={`row-${rowIndex}`}>
                  <Table.Cell>{record[clicAccountNumber]}</Table.Cell>
                  <Table.Cell>{record[soldProducts]}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default InstallationDayReminder;
