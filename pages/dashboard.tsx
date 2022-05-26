import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { PagedCollection } from "../types/Collection";
import { Product } from "../types/Product";
import Dashboard from "../components/dashboard/Dashboard";
import { SSRProps } from "../utils/ssrProps";


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
    <Dashboard products={collection["hydra:member"]} />
  </div>
);

SSRProps(Page, "/products");

export default Page;
