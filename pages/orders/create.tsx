import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/order/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Order </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
