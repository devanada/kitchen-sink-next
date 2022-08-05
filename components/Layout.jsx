import Head from "next/head";
import React from "react";

import Header from "./Header";

function Layout({ headTitle, headDesc, children, center }) {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDesc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className={`h-full w-full bg-white dark:bg-black bg-[url('../assets/layered-waves-haikei.svg')] bg-center bg-cover bg-no-repeat flex flex-col ${
          center && "items-center justify-center"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
