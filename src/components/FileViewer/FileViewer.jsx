import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const FileViewer = () => {
  const [records, updateRecords] = useState([]);
  return (
    <div id="file-viewer">
      <div>
        <Button secondary disabled={records.length > 0}>
          Nouveau Fichier
        </Button>
        <Button negative disabled={records.length === 0}>
          Vider le fichier
        </Button>
      </div>
    </div>
  );
};

export default FileViewer;
