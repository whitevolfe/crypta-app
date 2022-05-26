import React, { FunctionComponent } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LatestProducts } from './LatestProducts';
import { Product } from "../../types/Product";
import PortfolioSummary from './PortfolioSummary';

interface Props {
  products: Product[];
}

const Dashboard: FunctionComponent<Props> = ({ products }) => (
    <Container maxWidth={false}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
            <PortfolioSummary />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
            Resolution
          {/* <Resolution className={classes.firstRow} /> */}
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
            TotalProfit
          {/* <TotalProfit className={classes.firstRow} /> */}
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestProducts initialProducts={products} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
            DailyVisitsInsight
          {/* <DailyVisitsInsight className="" /> */}
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
            TrafficByDevice
          {/* <TrafficByDevice className="" /> */}
        </Grid>

        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
            TrafficByDevice
          {/* <LatestProducts className="" /> */}
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
            TrafficByDevice
          {/* <LatestOrders className="" /> */}
        </Grid>
      </Grid>
    </Container>
);

export default Dashboard;