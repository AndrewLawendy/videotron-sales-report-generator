import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

// Components
import Header from "./components/Header/Header.jsx";
import NameAndPr from "./components/NameAndPr/NameAndPr.jsx";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <NameAndPr />
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
