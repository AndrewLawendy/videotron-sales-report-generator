import React from "react";
import { Input } from "semantic-ui-react";

import DatePicker from "react-datepicker";

const ExampleCustomInput = React.forwardRef(function createCustomInput(
  { label, value, onClick },
  ref
) {
  return (
    <Input
      readOnly
      fluid
      ref={ref}
      label={label}
      onClick={onClick}
      onFocus={onClick}
      value={value}
    />
  );
});

export const SemanticFormikDatePicker = props => {
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
    label
  } = props;

  const ref = React.createRef();

  return (
    <DatePicker
      selected={value}
      onChange={date => setFieldValue(name, date)}
      dateFormat="dd/MM/yyyy"
      onBlur={() => {
        setFieldTouched(name, true);
      }}
      customInput={<ExampleCustomInput label={label} ref={ref} />}
    />
  );
};
