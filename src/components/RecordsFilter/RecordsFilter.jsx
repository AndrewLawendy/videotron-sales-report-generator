import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

import { RECORDS } from "../../constants";
import { getLocalItem } from "../../utils";

import "./style.scss";

const RecordsFilter = ({ setRecords, setIsFiltered }) => {
  const [callDates, setCallDates] = useState([]);
  const [installationDates, setInstallationDates] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const records = getLocalItem(RECORDS);

  const filter = () => {
    const allRecords = getLocalItem(RECORDS);
    const filterByCallDates = record => {
      if (callDates.length > 0) {
        return callDates.includes(record);
      }
      return true;
    };

    const filterByInstallationDates = record => {
      if (installationDates.length > 0) {
        return installationDates.includes(record);
      }
      return true;
    };

    const filterBySoldProducts = record => {
      if (soldProducts.length > 0) {
        return soldProducts.includes(record);
      }
      return true;
    };

    const isFiltered = () => {
      return (
        callDates.length > 0 ||
        soldProducts.length > 0 ||
        installationDates.length > 0
      );
    };

    const filteredRecords = allRecords.filter(record => {
      return (
        filterByCallDates(record["Date d'appel"]) &&
        filterByInstallationDates(record["Date d'installation ou livraison"]) &&
        filterBySoldProducts(record["Produit vendu"])
      );
    });

    setRecords(filteredRecords);
    setIsFiltered(isFiltered());
  };

  useEffect(filter, [callDates, soldProducts, installationDates]);

  const createDropDownOption = token => ({
    key: token,
    text: token,
    value: token
  });

  const uniqueOptions = options => {
    return options.filter((option, index, arr) => {
      const optionsIndex = arr.findIndex(opt => opt.key === option.key);
      return optionsIndex == index;
    });
  };

  const callDatesOptions = records.map(record =>
    createDropDownOption(record["Date d'appel"])
  );
  const installationDatesOptions = records.map(record =>
    createDropDownOption(record["Date d'installation ou livraison"])
  );
  const soldProductsOptions = records.map(record =>
    createDropDownOption(record["Produit vendu"])
  );

  return (
    <div className="records-filter">
      <div>
        <Dropdown
          placeholder="Date d'appel"
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => setCallDates(value)}
          options={uniqueOptions(callDatesOptions)}
        />
      </div>

      <div>
        <Dropdown
          placeholder="Produit vendu"
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => setSoldProducts(value)}
          options={uniqueOptions(soldProductsOptions)}
        />
      </div>

      <div>
        <Dropdown
          placeholder="Date d'installation ou livraison"
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => setInstallationDates(value)}
          options={uniqueOptions(installationDatesOptions)}
        />
      </div>
    </div>
  );
};

export default RecordsFilter;
