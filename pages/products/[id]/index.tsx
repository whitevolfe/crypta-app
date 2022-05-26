import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/product/Show";
import { Product } from "../../../types/Product";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  product: Product;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  product,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Product ${product["@id"]}`}</title>
        </Head>
      </div>
      <Show product={product} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const product = await fetch(asPath);

  return { product };
};

export default Page;
