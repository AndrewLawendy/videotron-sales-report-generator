import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Label, Button } from "semantic-ui-react";
import { SemanticFormikInputField } from "../Input/Input.jsx";

const userSchema = Yup.object().shape({
  "Nom du conseiller": Yup.string().required("Votre nom est obligatoire"),
  PR: Yup.number().required("Votre PR est obligatoire")
});

const NameAndPr = ({ submit, employee }) => {
  return (
    <Formik
      initialValues={{
        "Nom du conseiller": employee["Nom du conseiller"],
        PR: employee.PR
      }}
      validationSchema={userSchema}
      onSubmit={submit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <div className="field-wrapper">
            <Field
              name="Nom du conseiller"
              label="Prenom"
              defaultValue={employee["Nom du conseiller"]}
              component={SemanticFormikInputField}
            />
            {errors["Nom du conseiller"] && touched["Nom du conseiller"] ? (
              <Label basic color="red" pointing>
                {errors["Nom du conseiller"]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name="PR"
              label="PR"
              type="number"
              defaultValue={employee.PR}
              component={SemanticFormikInputField}
            />
            {errors.PR && touched.PR ? (
              <Label basic color="red" pointing>
                {errors.PR}
              </Label>
            ) : null}
          </div>
          <Button disabled={!dirty || !isValid} secondary>
            Soumetter
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NameAndPr;
