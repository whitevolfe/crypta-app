import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/order/Form";
import { Order } from "../../../types/Order";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  order: Order;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ order }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{order && `Edit Order ${order["@id"]}`}</title>
        </Head>
      </div>
      <Form order={order} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const order = await fetch(asPath.replace("/edit", ""));

  return { order };
};

export default Page;
