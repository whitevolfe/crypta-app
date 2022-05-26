import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/dailytip/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create DailyTip </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
