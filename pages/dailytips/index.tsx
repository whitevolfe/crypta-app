import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/dailytip/List";
import { PagedCollection } from "../../types/Collection";
import { DailyTip } from "../../types/DailyTip";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<DailyTip>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>DailyTip List</title>
      </Head>
    </div>
    <List daily_tips={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/daily_tips");

  return { collection };
};

export default Page;
