/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { TokenContext } from "../utils/context";

function Profile() {
  const { setToken } = useContext(TokenContext);
  const router = useRouter();
  const [objSubmit, setObjSubmit] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(
      "https://alta-kitchen-sink.herokuapp.com/api/v1/profile",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { message, code, data } = result;
        const { email, first_name, last_name, image } = data;
        if ([401, 403].includes(code)) {
          localStorage.removeItem("token");
          setToken("0");
          router.push("/login");
          alert(message);
        } else {
          setEmail(email);
          setFirstName(first_name);
          setLastName(last_name);
          const insertHTTPS = image.replace("http", "https");
          setImage(insertHTTPS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };

    fetch("http://192.168.1.132:4001/api/v1/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => console.log("error", error))
      .finally(() => fetchData());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout>
        <div className="w-full h-full flex items-center justify-center gap-4">
          <Image src={image} alt={image} width={200} height={200} />
          <form
            className="flex flex-col gap-4 min-w-[40%]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <CustomInput
              id="input-file"
              type="file"
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                handleChange(e.target.files[0], "image");
              }}
            />
            <CustomInput
              id="input-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e.target.value, "email")}
            />
            <CustomInput
              id="input-first-name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleChange(e.target.value, "first_name")}
            />
            <CustomInput
              id="input-last-name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleChange(e.target.value, "last_name")}
            />
            <CustomButton id="btn-submit" label="Submit" loading={loading} />
          </form>
        </div>
      </Layout>
    );
  }
}

export default Profile;
