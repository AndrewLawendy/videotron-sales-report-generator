import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Label, Button } from "semantic-ui-react";
import { SemanticFormikInputField } from "../Input/Input.jsx";

import { headers } from "../../constants";
const [, pr, agentName] = headers;

const userSchema = Yup.object().shape({
  [agentName]: Yup.string().required("Votre nom est obligatoire"),
  [pr]: Yup.number().required("Votre PR est obligatoire")
});

const NameAndPr = ({ submit, employee }) => {
  return (
    <Formik
      initialValues={{
        [agentName]: employee[agentName],
        [pr]: employee[pr]
      }}
      validationSchema={userSchema}
      onSubmit={submit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <div className="field-wrapper">
            <Field
              name={agentName}
              label="Prenom"
              component={SemanticFormikInputField}
            />
            {errors[agentName] && touched[agentName] ? (
              <Label basic color="red" pointing>
                {errors[agentName]}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name={pr}
              label={pr}
              type="number"
              component={SemanticFormikInputField}
            />
            {errors[pr] && touched[pr] ? (
              <Label basic color="red" pointing>
                {errors[pr]}
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
