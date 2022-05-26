import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/order/Show";
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
          <title>{`Show Order ${order["@id"]}`}</title>
        </Head>
      </div>
      <Show order={order} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const order = await fetch(asPath);

  return { order };
};

export default Page;
