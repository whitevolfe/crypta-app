import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/dailytip/Show";
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
          <title>{`Show DailyTip ${dailytip["@id"]}`}</title>
        </Head>
      </div>
      <Show dailytip={dailytip} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const dailytip = await fetch(asPath);

  return { dailytip };
};

export default Page;
