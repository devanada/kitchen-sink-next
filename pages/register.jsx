import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email && password && firstName && lastName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, firstName, lastName, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(
      "https://alta-kitchen-sink.herokuapp.com/api/v1/register",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { message, data } = result;
        if (result.code === 200) {
          if (data) {
            router.push("/login");
          }
        }
        alert(message);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form
          className="flex flex-col gap-4 min-w-[40%]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <CustomInput
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomInput
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <CustomInput
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton
            id="btn-login"
            label="Register"
            loading={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
