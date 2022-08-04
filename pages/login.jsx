/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Layout from "../components/Layout";

function Login() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

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
          setCookie("token", token);
          router.push("/");
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
            id="input-email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            id="input-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-black dark:text-white">
            {`Don't`} have an account? Register{" "}
            <Link href="/register">
              <a id="to-register" className="text-blue-500">
                here!
              </a>
            </Link>
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
