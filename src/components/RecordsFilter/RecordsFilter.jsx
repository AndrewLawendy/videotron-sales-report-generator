import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

import { headers, RECORDS } from "../../constants";
import { getLocalItem } from "../../utils";

import "./style.scss";

const [
  callDateHeader,
  ,
  ,
  ,
  ,
  ,
  soldProductsHeader,
  ,
  ,
  ,
  installationDateHeader
] = headers;

const RecordsFilter = ({ setRecords, setIsFiltered, records = [] }) => {
  const [callDate, setCallDate] = useState([]);
  const [installationDate, setInstallationDate] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const filter = async ({
    callDateValue = callDate,
    installationDateValue = installationDate,
    soldProductsValue = soldProducts
  }) => {
    const allRecords = (await getLocalItem(RECORDS)) || [];
    const filterByCallDates = record => {
      if (callDateValue.length > 0) {
        return callDateValue.includes(record);
      }
      return true;
    };

    const filterByInstallationDates = record => {
      if (installationDateValue.length > 0) {
        return installationDateValue.includes(record);
      }
      return true;
    };

    const filterBySoldProducts = record => {
      if (soldProductsValue.length > 0) {
        return soldProductsValue.includes(record);
      }
      return true;
    };

    const isFiltered = () => {
      return (
        callDateValue.length > 0 ||
        soldProductsValue.length > 0 ||
        installationDateValue.length > 0
      );
    };

    const filteredRecords = allRecords.filter(record => {
      return (
        filterByCallDates(record[callDateHeader]) &&
        filterByInstallationDates(record[installationDateHeader]) &&
        filterBySoldProducts(record[soldProductsHeader])
      );
    });

    setRecords(filteredRecords);
    setIsFiltered(isFiltered());
  };

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
    createDropDownOption(record[callDateHeader])
  );
  const installationDatesOptions = records.map(record =>
    createDropDownOption(record[installationDateHeader])
  );
  const soldProductsOptions = records.map(record =>
    createDropDownOption(record[soldProductsHeader])
  );

  return (
    <div className="records-filter">
      <div>
        <Dropdown
          placeholder={callDateHeader}
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => {
            setCallDate(value);
            filter({ callDateValue: value });
          }}
          options={uniqueOptions(callDatesOptions)}
        />
      </div>

      <div>
        <Dropdown
          placeholder={soldProductsHeader}
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => {
            setSoldProducts(value);
            filter({ soldProductsValue: value });
          }}
          options={uniqueOptions(soldProductsOptions)}
        />
      </div>

      <div>
        <Dropdown
          placeholder={installationDateHeader}
          noResultsMessage="Pas d'autre choix"
          fluid
          multiple
          clearable
          search
          selection
          disabled={records.length == 0}
          onChange={(_, { value }) => {
            setInstallationDate(value);
            filter({ installationDateValue: value });
          }}
          options={uniqueOptions(installationDatesOptions)}
        />
      </div>
    </div>
  );
};

export default RecordsFilter;
