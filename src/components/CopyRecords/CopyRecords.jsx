import React from "react";
import select from "select";
import { Button, Message } from "semantic-ui-react";
import { store } from "react-notifications-component";

import { clearSelection } from "../../utils";

const CopyRecords = ({ disabled }) => {
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

  const copyRecords = () => {
    const tbody = document.querySelector("tbody");
    select(tbody);
    document.execCommand("copy");
    clearSelection();
    showCopySuccess();
  };
  return (
    <Button
      primary
      content="Copier"
      icon="copy outline"
      labelPosition="left"
      disabled={disabled}
      onClick={copyRecords}
    />
  );
};

export default CopyRecords;
