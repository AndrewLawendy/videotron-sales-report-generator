import React from "react";
import { Dropdown, Label } from "semantic-ui-react";

import "./style.scss";

export const SemanticFormikDropdown = props => {
  const {
    field: {
      // provided by Formik Field
      name,
      value
    },
    form: {
      // also provided by Formik Field
      setFieldValue,
      setFieldTouched,
      values
    },
    label,
    options,
    disabled,
    onChange = () => {}
  } = props;
  return (
    <div className="dropdown-container">
      <Label size="large">{label}</Label>
      <Dropdown
        search
        selection
        disabled={disabled}
        options={options}
        value={value}
        onClose={event => {
          if (event) {
            const { target } = event;
            if (target.nodeName === "INPUT") {
              setFieldValue(name, target.nextSibling.innerText);
            }
          }
        }}
        onChange={event => {
          setFieldValue(name, event.target.innerText);
          onChange(event.target.innerText, setFieldValue);
        }}
        onBlur={() => {
          setFieldTouched(name, true);
        }}
      />
    </div>
  );
};
