import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import "./general.scss";

import { Container, Header, Button, Icon } from "semantic-ui-react";

const App = () => {
  return (
    <Container>
      <Header>Appuyez sur Télécharger pour obtenir l&apos;application</Header>
      <a download title="Télécharger" href="#">
        <Button primary size="huge" icon labelPosition="left">
          <Icon name="cloud download"></Icon>
          Télécharger
        </Button>
      </a>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
