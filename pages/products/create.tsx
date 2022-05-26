import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/product/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Product </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
