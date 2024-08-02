import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            label={"First Name"}
            placeholder={"Jon"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Email"}
            placeholder={"amrish@gmail.com"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate(`/dashboard`);
              }}
            ></Button>
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};

export default Signup;
