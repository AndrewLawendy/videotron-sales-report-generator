import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

import { Label, Button } from "semantic-ui-react";

import { SemanticFormikInputField } from "../Input/Input.jsx";
import { SemanticFormikDatePicker } from "../DatePicker/DatePicker.jsx";
import { SemanticFormikDropdown } from "../Dropdown/Dropdown.jsx";

const northAmericanTelephone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const clicAccount = /^\d{8}(-\d{3}-\d)?$/;
const helixAccount = /^\d{12}$/;

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

const recordSchema = Yup.object().shape({
  "Date d'appel": Yup.date().required("Date d'appel est obligatoire"),
  "(Genesys ou liste Excel)": Yup.string().required(),
  "Codification de l'interaction": Yup.string().required(),
  "Nombre de Produit": Yup.number()
    .min(1, "Le nombre doit être plus grand ou égale à 1")
    .required("Nombre de produit est obligatoire"),
  "Produit vendu": Yup.string().required(),
  "Numéro de téléphone": Yup.string()
    .matches(northAmericanTelephone, "Le numéro de téléphone n'est pas valide!")
    .required("Le numéro de téléphone est obligatoire"),
  "Numéro de compte Clic": Yup.string()
    .matches(clicAccount, "Numéro de compte Clic n'est pas valide!")
    .required("Numéro de compte Clic est obligatoire"),
  "Numéro de compte Hélix": Yup.string().when("Produit vendu", {
    is: prod => prod !== "RTMO",
    then: Yup.string()
      .matches(helixAccount, "Numéro de compte Hélix n'est pas valide!")
      .required("Numéro de compte Hélix est obligatoire")
  }),
  "Date d'installation ou livraison": Yup.date().required(
    "Date d'installation ou livraison est obligatoire"
  )
});

const AddRecord = ({ record = {}, onSubmit }) => {
  const [isRTMO, setIsRTMO] = useState(false);

  const onProductChanged = (value, setter) => {
    switch (value) {
      case "INTERNET":
        setIsRTMO(false);
        setter("Nombre de Produit", 1);
        break;
      case "INT+TV":
        setIsRTMO(false);
        setter("Nombre de Produit", 2);
        break;
      default:
        // RTMO
        setIsRTMO(true);
        setter("Codification de l'interaction", "RTMO");
        setter("Nombre de Produit", 1);
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
              name="Date d'appel"
              label="Date d'appel"
              component={SemanticFormikDatePicker}
            />
            {errors["Date d'appel"] && touched["Date d'appel"] ? (
              <Label basic color="red" pointing>
                {errors["Date d'appel"]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name="(Genesys ou liste Excel)"
              label="Genesys ou liste Excel"
              options={genesysExcelOptions}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name="Produit vendu"
              label="Produit vendu"
              options={productsSoldOptions}
              onChange={onProductChanged}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name="Codification de l'interaction"
              label="Codification de l'interaction"
              options={filterCodificationOptions()}
              disabled={isRTMO}
              component={SemanticFormikDropdown}
            />
          </div>

          <div className="field-wrapper">
            <Field
              name="Nombre de Produit"
              label="Nombre de Produit"
              type="number"
              readOnly={!isRTMO}
              component={SemanticFormikInputField}
            />
            {errors["Nombre de Produit"] && touched["Nombre de Produit"] ? (
              <Label basic color="red" pointing>
                {errors["Nombre de Produit"]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name="Numéro de téléphone"
              label="Numéro de téléphone"
              component={SemanticFormikInputField}
            />
            {errors["Numéro de téléphone"] && touched["Numéro de téléphone"] ? (
              <Label basic color="red" pointing>
                {errors["Numéro de téléphone"]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name="Numéro de compte Clic"
              label="Numéro de compte Clic"
              component={SemanticFormikInputField}
            />
            {errors["Numéro de compte Clic"] &&
            touched["Numéro de compte Clic"] ? (
              <Label basic color="red" pointing>
                {errors["Numéro de compte Clic"]}
              </Label>
            ) : null}
          </div>

          {values["Produit vendu"] !== "RTMO" && (
            <div className="field-wrapper">
              <Field
                name="Numéro de compte Hélix"
                label="Numéro de compte Hélix"
                component={SemanticFormikInputField}
              />
              {errors["Numéro de compte Hélix"] &&
              touched["Numéro de compte Hélix"] ? (
                <Label basic color="red" pointing>
                  {errors["Numéro de compte Hélix"]}
                </Label>
              ) : null}
            </div>
          )}

          <div className="field-wrapper date-picker">
            <Field
              name="Date d'installation ou livraison"
              label="Date de l'installation ou livraison"
              component={SemanticFormikDatePicker}
            />
            {errors["Date d'installation ou livraison"] &&
            touched["Date d'installation ou livraison"] ? (
              <Label basic color="red" pointing>
                {errors["Date d'installation ou livraison"]}
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
