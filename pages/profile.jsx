/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Layout from "../components/Layout";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    "https://alta-kitchen-sink.herokuapp.com/api/v1/profile",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

export default function Profile({ data, token }) {
  const [dataUser, setDataUser] = useState(data);
  const [objSubmit, setObjSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(
      "https://alta-kitchen-sink.herokuapp.com/api/v1/profile",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center gap-4">
        <Image
          src={dataUser.image}
          alt={dataUser.image}
          width={200}
          height={200}
        />
        <form
          className="flex flex-col gap-4 min-w-[40%]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <CustomInput
            id="input-file"
            type="file"
            onChange={(e) => {
              setDataUser({
                ...dataUser,
                image: URL.createObjectURL(e.target.files[0]),
              });
              handleChange(e.target.files[0], "image");
            }}
          />
          <CustomInput
            id="input-email"
            type="email"
            placeholder="Email"
            value={dataUser.email}
            onChange={(e) => handleChange(e.target.value, "email")}
          />
          <CustomInput
            id="input-first-name"
            type="text"
            placeholder="First Name"
            value={dataUser.first_name}
            onChange={(e) => handleChange(e.target.value, "first_name")}
          />
          <CustomInput
            id="input-last-name"
            type="text"
            placeholder="Last Name"
            value={dataUser.last_name}
            onChange={(e) => handleChange(e.target.value, "last_name")}
          />
          <CustomButton id="btn-submit" label="Submit" loading={loading} />
        </form>
      </div>
    </Layout>
  );
}
