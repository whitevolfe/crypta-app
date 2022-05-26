import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { DailyTip } from "../../types/DailyTip";
import AddEditButton from "./AddEditButton";

interface Props {
  daily_tips: DailyTip[];
}

export const List: FunctionComponent<Props> = ({ daily_tips }) => {

  if (daily_tips.length <= 0) return (
    <div>
      <h2>To create daily tips click the createButon</h2>
      <AddEditButton type="create" btnType="text" />
    </div>
  );

  return (
    <div>
      <h1>DailyTip List</h1>
      <Link href="/dailytips/create">
        <a className="btn btn-primary">Create</a>
      </Link>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {daily_tips &&
            daily_tips.length !== 0 &&
            daily_tips.map((dailytip) => (
              <tr key={dailytip["@id"]}>
                <th scope="row">
                  <ReferenceLinks items={dailytip["@id"]} type="dailytip" />
                </th>
                <td>
                  <ReferenceLinks
                    items={dailytip["@id"]}
                    type="dailytip"
                    useIcon={true}
                  />
                </td>
                <td>
                  <Link href={`${dailytip["@id"]}/edit`}>
                    <a>
                      <i className="bi bi-pen" aria-hidden="true" />
                      <span className="sr-only">Edit</span>
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
};
