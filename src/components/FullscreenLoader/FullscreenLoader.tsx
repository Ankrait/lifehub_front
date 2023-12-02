import { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';

const FullscreenLoader: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: grey[300],
        position: 'fixed',
        zIndex: 999,
        left: '-100px',
        top: '-100px',
        right: '-100px',
        bottom: '-100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size="100px" />
    </Box>
  );
};

export default FullscreenLoader;
