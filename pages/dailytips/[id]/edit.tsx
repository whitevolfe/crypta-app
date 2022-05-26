import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/dailytip/Form";
import { DailyTip } from "../../../types/DailyTip";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  dailytip: DailyTip;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  dailytip,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{dailytip && `Edit DailyTip ${dailytip["@id"]}`}</title>
        </Head>
      </div>
      <Form dailytip={dailytip} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const dailytip = await fetch(asPath.replace("/edit", ""));

  return { dailytip };
};

export default Page;
