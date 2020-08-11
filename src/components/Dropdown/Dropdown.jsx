import React from "react";
import { Dropdown, Label } from "semantic-ui-react";

import "./style.scss";

export const SemanticFormikDropdown = props => {
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
    options
  } = props;
  return (
    <div className="dropdown-container">
      <Label size="large">{label}</Label>
      <Dropdown
        search
        selection
        options={options}
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
        }}
        onBlur={() => {
          setFieldTouched(name, true);
        }}
      />
    </div>
  );
};
