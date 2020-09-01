import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";

import { setLocalItem } from "../../utils";
import { RECORDS } from "../../constants";

const ClearRecords = ({ disabled, setRecords }) => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  function clearRecords() {
    setLocalItem(RECORDS, []);
    setRecords([]);
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setRemoveDialogOpen(true);
        }}
        negative
        disabled={disabled}
      >
        Vider le fichier
      </Button>

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
    </React.Fragment>
  );
};

export default ClearRecords;
