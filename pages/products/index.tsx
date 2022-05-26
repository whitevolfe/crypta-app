import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/product/List";
import { PagedCollection } from "../../types/Collection";
import { Product } from "../../types/Product";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import { LatestProducts } from "../../components/dashboard/LatestProducts";

interface Props {
  collection: PagedCollection<Product>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Product List</title>
      </Head>
    </div>
    <LatestProducts products={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/products");

  return { collection };
};

export default Page;
