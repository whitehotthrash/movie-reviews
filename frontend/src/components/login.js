import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // name and id setters
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate(); // api v6 replacement for history.push

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const login = () => {
    props.login({ name: name, id: id });
    navigate("/"); // navigate to home after login
  };
// TODO: refactor, no unused vars
// TODO: fix return/ enter key freezing webpage
  return (
    <>
      <Form style={{ paddingTop: "6%"}}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant="primary" onClick={login}>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
