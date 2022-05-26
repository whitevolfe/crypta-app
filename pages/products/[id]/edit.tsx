import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/product/Form";
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
          <title>{product && `Edit Product ${product["@id"]}`}</title>
        </Head>
      </div>
      <Form product={product} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const product = await fetch(asPath.replace("/edit", ""));

  return { product };
};

export default Page;
