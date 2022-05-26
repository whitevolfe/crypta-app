import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Product } from "../../types/Product";

interface Props {
  products: Product[];
}

export const List: FunctionComponent<Props> = ({ products }) => (
  <div>
    <h1>Product List</h1>
    <Link href="/products/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>exchange</th>
          <th>tradingPair</th>
          <th>buyPrice</th>
          <th>amountBought</th>
          <th>exchangeFee</th>
          <th>createdDate</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products &&
          products.length !== 0 &&
          products.map((product) => (
            <tr key={product["@id"]}>
              <th scope="row">
                <ReferenceLinks items={product["@id"]} type="product" />
              </th>
              <td>{product["exchange"]}</td>
              <td>{product["tradingPair"]}</td>
              <td>{product["buyPrice"]}</td>
              <td>{product["amountBought"]}</td>
              <td>{product["exchangeFee"]}</td>
              <td>{product["createdDate"]}</td>
              <td>
                <ReferenceLinks
                  items={product["@id"]}
                  type="product"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${product["@id"]}/edit`}>
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
