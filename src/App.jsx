import React from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./MainStyle.scss";

// Components
import Header from "./components/Header/Header.jsx";
import FileViewer from "./components/FileViewer/FileViewer.jsx";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <FileViewer />
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));