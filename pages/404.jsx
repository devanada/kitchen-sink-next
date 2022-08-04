import Link from "next/link";
import Layout from "../components/Layout";

export default function FourOhFour() {
  return (
    <Layout center>
      <h1 className="text-2xl font-semibold dark:text-white">
        404 - Page Not Found
      </h1>
      <Link href="/">
        <a className="text-neutral-500 text-lg">Go back home</a>
      </Link>
    </Layout>
  );
}
