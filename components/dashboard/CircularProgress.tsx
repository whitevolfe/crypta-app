import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface IProps {
  handleClick: () => void;
  apiCall: () => void;
}

export default function CircularStatic({ handleClick, apiCall }: IProps) {
  const [progress, setProgress] = React.useState(1);


  //set timer for 60 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 600);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    //if progress is 2 make call to api becasue our country has slower internet connection that the rest of the world ?
    if (progress === 2) {
      apiCall();
    }

    // if progress is 100 update the result
    if (progress === 100) {
      handleClick();
    }
  }, [progress]);


  return <CircularProgressWithLabel value={progress} />;
}
