/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { TokenContext } from "../utils/context";

function Login() {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (token !== "0") {
      router.push("/profile");
    } else {
      if (email && password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [token, email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(
      "https://alta-kitchen-sink.herokuapp.com/api/v1/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { code, message, data } = result;
        if (code === 200) {
          const { token } = data;
          localStorage.setItem("token", token);
          setToken(token);
          router.push("/profile");
        }
        alert(message);
      })
      .catch((err) => {
        alert(err.toString());
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
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black dark:text-white">
            {`Don't`} have an account? Register{" "}
            <Link href="/register">here!</Link>
          </p>
          <CustomButton
            id="btn-login"
            label="Login"
            loading={loading || disabled}
          />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
