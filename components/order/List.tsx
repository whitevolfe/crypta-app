import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Order } from "../../types/Order";

interface Props {
  orders: Order[];
}

export const List: FunctionComponent<Props> = ({ orders }) => (
  <div>
    <h1>Order List</h1>
    <Link href="/orders/create">
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
        {orders &&
          orders.length !== 0 &&
          orders.map((order) => (
            <tr key={order["@id"]}>
              <th scope="row">
                <ReferenceLinks items={order["@id"]} type="order" />
              </th>
              <td>
                <ReferenceLinks
                  items={order["@id"]}
                  type="order"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${order["@id"]}/edit`}>
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
);
