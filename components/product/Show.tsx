import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Product } from "../../types/Product";

interface Props {
  product: Product;
}

export const Show: FunctionComponent<Props> = ({ product }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(product["@id"], { method: "DELETE" });
      router.push("/products");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Product ${product["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">exchange</th>
            <td>{product["exchange"]}</td>
          </tr>
          <tr>
            <th scope="row">tradingPair</th>
            <td>{product["tradingPair"]}</td>
          </tr>
          <tr>
            <th scope="row">buyPrice</th>
            <td>{product["buyPrice"]}</td>
          </tr>
          <tr>
            <th scope="row">amountBought</th>
            <td>{product["amountBought"]}</td>
          </tr>
          <tr>
            <th scope="row">exchangeFee</th>
            <td>{product["exchangeFee"]}</td>
          </tr>
          <tr>
            <th scope="row">createdDate</th>
            <td>{product["createdDate"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/products">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${product["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
