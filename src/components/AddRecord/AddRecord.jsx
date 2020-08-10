import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Label, Button } from "semantic-ui-react";

import { SemanticFormikInputField } from "../Input/Input.jsx";

const northAmericanTelephone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const clicAccount = /^\d{8}(-\d{3}-\d)?$/;
const helixAccount = /^\d{12}$/;

const recordSchema = Yup.object().shape({
  "Nombre de Produit": Yup.number()
    .min(1, "Le nombre doit être plus grand ou égale à 1")
    .required("Nombre de produit est obligatoire"),
  "Numéro de téléphone": Yup.string()
    .matches(northAmericanTelephone, "Le numéro de téléphone n'est pas valide!")
    .required("Le numéro de téléphone est obligatoire"),
  "Numéro de compte Clic": Yup.string()
    .matches(clicAccount, "Numéro de compte Clic n'est pas valide!")
    .required("Numéro de compte Clic est obligatoire"),
  "Numéro de compte Hélix": Yup.string()
    .matches(helixAccount, "Numéro de compte Hélix n'est pas valide!")
    .required("Numéro de compte Hélix est obligatoire")
});

const AddRecord = () => {
  return (
    <div id="add-record">
      <Formik
        initialValues={{}}
        validationSchema={recordSchema}
        onSubmit={values => console.log(values)}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <div className="field-wrapper">
              <Field
                name="Nombre de Produit"
                label="Nombre de Produit"
                type="number"
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
              {errors["Numéro de téléphone"] &&
              touched["Numéro de téléphone"] ? (
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

            <Button disabled={!dirty || !isValid} secondary>
              Soumetter
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecord;
