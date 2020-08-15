import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

import { Label, Button } from "semantic-ui-react";

import { headers } from "../../constants";

import { SemanticFormikInputField } from "../Input/Input.jsx";
import { SemanticFormikDatePicker } from "../DatePicker/DatePicker.jsx";
import { SemanticFormikDropdown } from "../Dropdown/Dropdown.jsx";

const northAmericanTelephoneRegexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const clicAccountRegexp = /^\d{8}(-\d{3}-\d)?$/;
const helixAccountRegexp = /^\d{12}$/;

const interactionCodificationOptions = [
  {
    key: "Migration effectuée",
    text: "Migration effectuée",
    value: "Migration effectuée"
  },
  {
    key: "BR Hélix",
    text: "BR Hélix",
    value: "BR Hélix"
  },
  {
    key: "RTMO",
    text: "RTMO",
    value: "RTMO"
  }
];

const productsSoldOptions = [
  {
    key: "INTERNET",
    text: "INTERNET",
    value: "INTERNET"
  },
  {
    key: "INT+TV",
    text: "INT+TV",
    value: "INT+TV"
  },
  {
    key: "RTMO",
    text: "RTMO",
    value: "RTMO"
  }
];

const genesysExcelOptions = [
  {
    key: "Genesys",
    text: "Genesys",
    value: "Genesys"
  },
  {
    key: "excel",
    text: "excel",
    value: "excel"
  }
];

const [
  callDate,
  ,
  ,
  genesysOrExcel,
  interactionCodification,
  productsNumber,
  soldProducts,
  phoneNumber,
  clicAccountNumber,
  helixAccountNumber,
  installationDate
] = headers;

const recordSchema = Yup.object().shape({
  [callDate]: Yup.date().required("Date d'appel est obligatoire"),
  [genesysOrExcel]: Yup.string().required(),
  [interactionCodification]: Yup.string().required(),
  [productsNumber]: Yup.number()
    .min(1, "Le nombre doit être plus grand ou égale à 1")
    .required("Nombre de produit est obligatoire"),
  [soldProducts]: Yup.string().required(),
  [phoneNumber]: Yup.string()
    .matches(
      northAmericanTelephoneRegexp,
      "Le numéro de téléphone n'est pas valide!"
    )
    .required("Le numéro de téléphone est obligatoire"),
  [clicAccountNumber]: Yup.string()
    .matches(clicAccountRegexp, "Numéro de compte Clic n'est pas valide!")
    .required("Numéro de compte Clic est obligatoire"),
  [helixAccountNumber]: Yup.string().when(soldProducts, {
    is: prod => prod !== "RTMO",
    then: Yup.string()
      .matches(helixAccountRegexp, "Numéro de compte Hélix n'est pas valide!")
      .required("Numéro de compte Hélix est obligatoire")
  }),
  [installationDate]: Yup.date().required(
    "Date d'installation ou livraison est obligatoire"
  )
});

const AddRecord = ({ record = {}, onSubmit }) => {
  const [isRTMO, setIsRTMO] = useState(false);

  const onProductChanged = (value, setter) => {
    switch (value) {
      case "INTERNET":
        setIsRTMO(false);
        setter(productsNumber, 1);
        break;
      case "INT+TV":
        setIsRTMO(false);
        setter(productsNumber, 2);
        break;
      default:
        // RTMO
        setIsRTMO(true);
        setter(interactionCodification, "RTMO");
        setter(productsNumber, 1);
    }
  };

  const filterCodificationOptions = () => {
    let filtered;
    if (isRTMO) {
      filtered = interactionCodificationOptions.slice(2);
    } else {
      filtered = interactionCodificationOptions.slice(0, 2);
    }
    return filtered;
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={record}
      validationSchema={recordSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, isValid, dirty }) => (
        <Form>
          <div className="field-wrapper date-picker">
            <Field
              name={callDate}
              label={callDate}
              component={SemanticFormikDatePicker}
            />
            {errors[callDate] && touched[callDate] ? (
              <Label basic color="red" pointing>
                {errors[callDate]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name={genesysOrExcel}
              label="Genesys ou liste Excel"
              options={genesysExcelOptions}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name={soldProducts}
              label={soldProducts}
              options={productsSoldOptions}
              onChange={onProductChanged}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name={interactionCodification}
              label={interactionCodification}
              options={filterCodificationOptions()}
              disabled={isRTMO}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name={productsNumber}
              label={productsNumber}
              type="number"
              readOnly={!isRTMO}
              component={SemanticFormikInputField}
            />
            {errors[productsNumber] && touched[productsNumber] ? (
              <Label basic color="red" pointing>
                {errors[productsNumber]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name={phoneNumber}
              label={phoneNumber}
              component={SemanticFormikInputField}
            />
            {errors[phoneNumber] && touched[phoneNumber] ? (
              <Label basic color="red" pointing>
                {errors[phoneNumber]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name={clicAccountNumber}
              label={clicAccountNumber}
              component={SemanticFormikInputField}
            />
            {errors[clicAccountNumber] && touched[clicAccountNumber] ? (
              <Label basic color="red" pointing>
                {errors[clicAccountNumber]}
              </Label>
            ) : null}
          </div>

          {values[soldProducts] !== "RTMO" && (
            <div className="field-wrapper">
              <Field
                name={helixAccountNumber}
                label={helixAccountNumber}
                component={SemanticFormikInputField}
              />
              {errors[helixAccountNumber] && touched[helixAccountNumber] ? (
                <Label basic color="red" pointing>
                  {errors[helixAccountNumber]}
                </Label>
              ) : null}
            </div>
          )}

          <div className="field-wrapper date-picker">
            <Field
              name={installationDate}
              label={installationDate}
              component={SemanticFormikDatePicker}
            />
            {errors[installationDate] && touched[installationDate] ? (
              <Label basic color="red" pointing>
                {errors[installationDate]}
              </Label>
            ) : null}
          </div>

          <Button type="submit" disabled={!dirty || !isValid} secondary>
            {Object.keys(record).length == 0 ? "Ajouter" : "Mettre à jour"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecord;
