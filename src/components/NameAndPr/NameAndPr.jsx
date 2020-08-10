import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Label, Button } from "semantic-ui-react";
import { SemanticFormikInputField } from "../Input/Input.jsx";

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Votre nom est obligatoire"),
  pr: Yup.number().required("Votre PR est obligatoire")
});

const NameAndPr = ({ submit, employee }) => {
  return (
    <Formik
      initialValues={{ firstName: employee.firstName, pr: employee.pr }}
      validationSchema={userSchema}
      onSubmit={submit}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <div className="field-wrapper">
            <Field
              name="firstName"
              label="Prenom"
              defaultValue={employee.firstName}
              component={SemanticFormikInputField}
            />
            {errors.firstName && touched.firstName ? (
              <Label basic color="red" pointing>
                {errors.firstName}
              </Label>
            ) : null}
          </div>

          <div className="field-wrapper">
            <Field
              name="pr"
              label="PR"
              type="number"
              defaultValue={employee.pr}
              component={SemanticFormikInputField}
            />
            {errors.pr && touched.pr ? (
              <Label basic color="red" pointing>
                {errors.pr}
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
