import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";

import "./style.scss";

import Logo from "../../assets/logo-videotron-icon.png";

const Header = () => {
  const [nameAndPr, updateNameAndPr] = useState({
    name: "Utilisateur",
    pr: "000000"
  });

  const getNameAndPr = () => {
    const nameAndPr = localStorage.getItem("nameAndPr");
    if (nameAndPr != undefined) {
      const nameAndPrObject = JSON.parse(nameAndPr);
      updateNameAndPr(nameAndPrObject);
    }
  };

  useEffect(getNameAndPr, []);

  return (
    <header>
      <div className="profile">
        <div className="logo-container">
          <img src={Logo} alt="Videotron Logo" />
        </div>
        <h2>
          {nameAndPr.name}, {nameAndPr.pr}
        </h2>
      </div>
      <Button
        className="edit-btn"
        content="Modifier Nom ou Pr"
        icon="edit"
        labelPosition="left"
      />
    </header>
  );
};

export default Header;
