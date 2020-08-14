import React from "react";
import { Form, Input } from "semantic-ui-react";

export const SemanticFormikInputField = props => {
  const {
    field: {
      // provided by Formik Field
      name,
      value
    },
    form: {
      // also provided by Formik Field
      setFieldValue,
      setFieldTouched
    },
    label,
    type = "text",
    readOnly
  } = props;

  return (
    <Form.Field>
      <Input
        fluid
        label={label}
        type={type}
        value={value}
        readOnly={readOnly}
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
