import React from "react";
import { Form, Input } from "semantic-ui-react";

export const SemanticFormikInputField = props => {
  const {
    field: {
      // provided by Formik Field
      name
    },
    form: {
      // also provided by Formik Field
      setFieldValue,
      setFieldTouched
    },
    label,
    type = "text",
    defaultValue
  } = props;

  return (
    <Form.Field>
      <Input
        fluid
        label={label}
        type={type}
        defaultValue={defaultValue}
        onChange={event => {
          setFieldValue(name, event.target.value);
        }}
        onBlur={() => {
          setFieldTouched(name, true);
        }}
      />
    </Form.Field>
  );
};
