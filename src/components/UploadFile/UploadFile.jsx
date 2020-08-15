import React from "react";
import xlsxParser from "xlsx-parse-json";

import "./style.scss";

const UploadFile = ({ records, isFiltered, updateRecords }) => {
  const parse = event => {
    const { target } = event;
    const file = target.files[0];
    xlsxParser.onFileSelection(file).then(data => {
      const firstSheet = Object.keys(data)[0];
      updateRecords(data[firstSheet]);
      target.value = "";
    });
  };

  return (
    <React.Fragment>
      <input
        disabled={isFiltered || records.length > 0}
        type="file"
        id="addActualFile"
        onChange={parse}
      />
      <label
        className={`ui secondary button ${
          isFiltered || records.length > 0 ? "disabled" : ""
        }`}
        htmlFor="addActualFile"
      >
        Telecharger un fichier actuel
      </label>
    </React.Fragment>
  );
};

export default UploadFile;
