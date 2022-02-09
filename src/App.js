import styled from "styled-components";
import { useEffect, useState } from "react";
import Axios from "axios";
import Form from "./components/Form";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import Textarea from "./components/Textarea";
import SuccessMessage from "./components/SuccessMessage";

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userMessage, setUserMessage] = useState("");
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    Axios.get("https://application-form-api.herokuapp.com/api/get").then(
      (response) => {
        console.log(response.data);
      }
    );
  }, []);

  const submitForm = () => {
    Axios.post("https://application-form-api.herokuapp.com/api/insert", {
      userName,
      userEmail,
      userMessage,
    });
    setSuccess(true);
    setUserName("");
    setUserEmail("");
    setUserMessage("");
  };
  return (
    <AppWrapper>
      <h1>Application Form</h1>
      <Form>
        <Label>Name</Label>
        <Input
          required
          placeholder="Your name"
          type="text"
          name="name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Label>Email</Label>
        <Input
          required
          placeholder="Your email"
          type="text"
          name="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <Label>Message</Label>
        <Textarea
          required
          placeholder="Your message"
          name="message"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
        />
        <Button onClick={submitForm}>Send message</Button>
      </Form>
      {success && (
        <SuccessMessage>
          Your message was succesfully uploaded to MySQL DB!
        </SuccessMessage>
      )}
    </AppWrapper>
  );
};

export default App;
