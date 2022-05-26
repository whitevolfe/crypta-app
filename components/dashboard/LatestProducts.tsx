import React, { useState, useCallback } from "react";
import { FunctionComponent } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Product } from "../../types/Product";
import AddEditButton from "../product/AddEditButton";
import DeleteButton from "../product/DeleteButton";
import OrderAddEditButton from "../order/AddEditButton";
import OrderDeleteButton from "../order/DeleteButton";
import { Stack } from "@mui/material";
import InfoIcon from "../dashboard/InfoIcon";
import { styled } from "@mui/material/styles";
import { Label } from "../product/Label";
import { OrderRow } from "../order/OrderRow";
import { dollarFormatter } from "../../utils/common";
import { OrderRowBox } from "../order/OrderRowBox";
import CircularProgress from './CircularProgress';
import { fetch } from '../../utils/dataAccess';
import Skeleton from '@mui/material/Skeleton';
import useGlobalContext from '../../context/GlobalContext/GlobalContext';
import Calculation from "../calculation/Calculation";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const HistoryStyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface Props {
  initialProducts: Product[];
  loading: boolean;
}

function Row(props) {
  const { product, loading } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      {
        loading ?
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }} id="sd">
            <TableCell sx={{ "padding": "0px 2px !important" }}>
              <Skeleton animation="wave" width={'75px'} height={'150px'} />
            </TableCell>
            <TableCell sx={{ "padding": "0px 2px !important" }}>
              <Skeleton animation="wave" width={'311px'} height={'150px'} />
            </TableCell>
            <TableCell sx={{ "padding": "0px 2px !important" }}>
              <Skeleton animation="wave" width={'261.5px'} height={'150px'} />
            </TableCell>
            <TableCell sx={{ "padding": "0px 2px !important" }}>
              <Skeleton animation="wave" width={'272px'} height={'150px'} />
            </TableCell>
          </TableRow>
          : <>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }} id="sd">
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? (
                    <KeyboardArrowUpIcon sx={{ color: "text.secondary" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "text.secondary" }} />
                  )}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                <Label product={product} />
              </TableCell>
              <TableCell>
                <OrderRowBox
                  label={"Current Worth"}
                  value={dollarFormatter(product.currentWorth)}
                  text={dollarFormatter(product.priceChange)}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <OrderAddEditButton
                    type="create"
                    btnType="icon"
                    order={{ product: product["@id"], type: "buy" }}
                  />
                  <AddEditButton type="edit" btnType="icon" product={product} />
                  <InfoIcon />
                  <DeleteButton product={product} />
                </Stack>
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        {product.orders.map((order, index) => (
                          <HistoryStyledTableRow key={`order-${index}`}>
                            <TableCell component="th" scope="row">
                              <OrderRow
                                order={order}
                                tradingPair={
                                  product.coinDetails.name + "/" + product.tradingPair
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Calculation order={order} />
                            </TableCell>
                          </HistoryStyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </StyledTableRow>
          </>}
    </React.Fragment>
  );
}

export const LatestProducts: FunctionComponent<Props> = ({ initialProducts }) => {
  const { products, setProducts } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const [latestProducts, setLatestProducts] = React.useState([]);
  const [error, setError] = React.useState<any>("");

  React.useEffect(() => {
    setProducts(initialProducts);
  }, [])

  const setNewProductsState = useCallback(() => {
    setProducts(products);
  }, [latestProducts])


  const callApi = () => {
    setLoading(true);
    fetch('/products').then(res => {
      setLatestProducts(res["hydra:member"]);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <Container maxWidth={false}>
      <Card>
        <CardHeader title="Latest Orders" sx={{ color: "text.secondary" }} />
        <CardContent>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell >

                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                      <AddEditButton type="create" btnType="text" />
                      &nbsp;&nbsp;

                      <IconButton
                        aria-label="loading"
                        size="small"
                        onClick={callApi}
                        sx={{ marginTop: -1 }}
                      >
                        {" "}
                        <CircularProgress
                          handleClick={setNewProductsState}
                          apiCall={callApi}
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.length !== 0 &&
                  products.map((product, index) => (
                    <React.Fragment key={`product-${index}`}>
                      <Row product={product} loading={loading} />
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};
