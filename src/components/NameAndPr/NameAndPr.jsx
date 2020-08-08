import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./style.scss";

import { Label, Button } from "semantic-ui-react";
import { SemanticFormikInputField } from "../Input/Input.jsx";

const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Votre nom est Obligatoire"),
  pr: Yup.number().required("Votre PR est obligatoire")
});

const NameAndPr = () => {
  return (
    <div id="name-and-pr">
      <Formik
        initialValues={{ firstName: "", pr: "" }}
        validationSchema={userSchema}
        onSubmit={values => console.log(values)}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <div className="field-wrapper">
              <Field
                name="firstName"
                label="Prenom"
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
    </div>
  );
};

export default NameAndPr;
