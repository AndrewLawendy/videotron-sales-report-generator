import React, { useState, useEffect } from "react";
import { Table, Modal } from "semantic-ui-react";
import { CronJob } from "cron";

import { headers, RECORDS } from "../../constants";
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

  const checkTodaysRecords = async () => {
    const allRecords = await getLocalItem(RECORDS);
    const formattedDate = getDateFormat(new Date());
    const filteredRecords = allRecords.filter(
      record => record[installationDate] == formattedDate
    );

    if (filteredRecords.length > 0) {
      setTodaysRecords(filteredRecords);
      setOpenModal(true);
    }
  };

  const initPage = () => {
    new CronJob("0 0 14 * * *", checkTodaysRecords, null, true);
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
