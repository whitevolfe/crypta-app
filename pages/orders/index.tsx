import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/order/List";
import { PagedCollection } from "../../types/Collection";
import { Order } from "../../types/Order";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Order>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Order List</title>
      </Head>
    </div>
    <List orders={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/orders");

  return { collection };
};

export default Page;
