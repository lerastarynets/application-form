import styled from "styled-components";
import { useEffect, useState } from "react";
import Axios from "axios";
import Form from "./components/Form";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import Textarea from "./components/Textarea";
import SuccessMessage from "./components/SuccessMessage";
import Error from "./components/Error";

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userMessage, setUserMessage] = useState("");
  let [nameTouched, setNameTouched] = useState(false);
  let [emailTouched, setEmailTouched] = useState(false);
  let [messageTouched, setMessageTouched] = useState(false);
  let [nameError, setNameError] = useState(null);
  let [emailError, setEmailError] = useState(null);
  let [messageError, setMessageError] = useState(null);
  let [success, setSuccess] = useState(false);
  let [formValid, setFormValid] = useState(false);

  useEffect(() => {
    // Axios.get("https://application-form-api.herokuapp.com/api/get").then(
    //   (response) => {
    //     console.log(response.data);
    //   }
    // );
    if (nameError || emailError || messageError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, messageError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      //Name validation
      case "name": {
        setNameTouched(true);
        if (userName === "") {
          setNameError("Name can't be empty!");
        } else if (userName.length < 2 || userName.length > 15) {
          setNameError(
            "Name can't be shorter then 2 symbols or longer then 15 symbols!"
          );
        } else {
          setNameError(null);
        }
        break;
      }

      //Email validation
      case "email": {
        setEmailTouched(true);
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (userEmail === "") {
          setEmailError("Email can't be empty!");
        } else if (!re.test(String(userEmail).toLowerCase())) {
          setEmailError("Email is invalid!");
        } else {
          setEmailError(null);
        }
        break;
      }

      //Message validation
      case "message": {
        setMessageTouched(true);
        if (userMessage === "") {
          setMessageError("Message can't be empty!");
        } else if (userMessage.length > 300) {
          setMessageError("Message can't be longer then 300 symbols!");
        } else {
          setMessageError(null);
        }
        break;
      }
    }
  };

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "name": {
        setUserName(e.target.value);
        break;
      }
      case "email": {
        setUserEmail(e.target.value);
        break;
      }
      case "message": {
        setUserMessage(e.target.value);
        break;
      }
    }
  };
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
        {nameTouched && nameError && <Error>{nameError}</Error>}
        <Input
          required
          placeholder="Your name"
          type="text"
          name="name"
          value={userName}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <Label>Email</Label>
        {emailTouched && emailError && <Error>{emailError}</Error>}
        <Input
          required
          placeholder="Your email"
          type="text"
          name="email"
          value={userEmail}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <Label>Message</Label>
        {messageTouched && messageError && <Error>{messageError}</Error>}
        <Textarea
          required
          placeholder="Your message"
          name="message"
          value={userMessage}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <Button disabled={!formValid} onClick={submitForm}>
          Send message
        </Button>
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
