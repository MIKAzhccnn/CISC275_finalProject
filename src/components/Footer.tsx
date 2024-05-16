import React, { ReactElement, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

// Local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "USER_OAKEY";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

export function Footer(): JSX.Element {
  const [key, setKey] = useState<string>(keyData);

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function handleReset() {
    localStorage.removeItem(saveKeyData);
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  function KeyInputForm({ keyInStore }: { keyInStore: boolean }): ReactElement {
    return (
      <Row className="align-items-center g-2">
        <Col xs="auto">
          <Button
            size="sm"
            onClick={handleSubmit}
            style={{ width: "100%", height: "100%" }}
          >
            Submit
          </Button>
        </Col>
        {keyInStore && (
          <Col xs="auto">
            <Button
              size="sm"
              variant="warning"
              onClick={handleReset}
              style={{ width: "100%", height: "100%" }}
            >
              Reset
            </Button>
          </Col>
        )}
      </Row>
    );
  }

  return (
    <Container
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        maxWidth: "100%",
        height: "90px",
        backgroundColor: "black",
        margin: "0",
        textAlign: "left",
        padding: "20px",
      }}
    >
      <Row>
        <Col>
          <Form>
            <Form.Label style={{ color: "white" }}>OpenAI API Key:</Form.Label>
            <Row className="align-items-center">
              <Col md={3} className="pe-0">
                <Form.Control
                  type="password"
                  size="sm"
                  placeholder="Insert API Key Here"
                  value={key}
                  onChange={changeKey}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs="auto">
                <KeyInputForm keyInStore={key !== ""} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
