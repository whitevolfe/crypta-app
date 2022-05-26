import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextureIcon from '@mui/icons-material/Texture';
import Grid from '@mui/material/Grid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { dollarFormatter } from "../../utils/common";

interface IProps {
  price?: number;
  currentDayPrice?: number;
  allTimePrice?: number;
}

export default function BasicCard({ price = 5455, currentDayPrice = -4.57, allTimePrice = 4355 }: IProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  }

  const VARIABLES = {
    currentDay: 'Current day loose',
    allTheTime: 'All the time loose',
  }

  return (
    <Card sx={{ width: '100%', backgroundColor: 'primary.dark', borderRadius: '20px' }}>
      <CardContent>
        <Typography sx={{ color: 'divider' }} variant="subtitle2" >COINBASE</Typography>
        <Grid container sx={{paddingBottom:"10px"}}>
          <Grid item xs={12}>
            <Grid container direction='row' alignItems="center">
              <Grid item xs={10} sx={{ color: 'divider' }}>
                <Grid container direction='row' justifyContent="flex-start" alignItems="center" >
                  <AttachMoneyIcon
                    fontSize='large'
                  />
                  {isVisible ? <Typography sx={{ fontSize: "30px", padding: 0 }} letterSpacing={10}>{price}</Typography> :
                    price.toString().split('').map((char, index) => (
                      <TextureIcon sx={{ fontSize: '28px' }} key={index} />
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={2} sx={{ color: 'primary.contrastText' }}>
                <Grid container direction='row' justifyContent="flex-end">
                  <Button sx={{ color: 'primary.contrastText' }} onClick={handleVisible}>
                    {isVisible ? <VisibilityOffIcon fontSize='large' /> : <RemoveRedEyeOutlinedIcon fontSize='large' />}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction='row' alignItems="center">
              <Grid item xs={8} >
                <Grid container justifyContent="flex-start" >
                  <Typography sx={{ color: 'primary.contrastText' }} variant="subtitle1" >{VARIABLES.currentDay}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} >
                <Grid container justifyContent="flex-end" >
                  <PriceLabel value={currentDayPrice} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction='row' alignItems="center">
              <Grid item xs={8} >
                <Grid container justifyContent="flex-start" >
                  <Typography sx={{ color: 'primary.contrastText' }} variant="subtitle1" >{VARIABLES.allTheTime}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} >
                <Grid container justifyContent="flex-end" >
                  <PriceLabel value={allTimePrice} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const PriceLabel = ({ value }: { value: number }) => <Typography sx={{
  color: value.toString().startsWith("-")
    ? "error.dark"
    : "success.dark",
  fontWeight: "medium !important",
}} variant="body1" >{dollarFormatter(value)}</Typography>
