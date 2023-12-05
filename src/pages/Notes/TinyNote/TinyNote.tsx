import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PushPin } from '@mui/icons-material';
import { grey, yellow } from '@mui/material/colors';

import { INote } from 'services/services.interface';

interface ITinyNote {
  note: INote;
  rows?: number;
  onClick?: () => void;
  active?: boolean;
}

const TinyNote: FC<ITinyNote> = ({ note, rows = 3, onClick, active }) => {
  return (
    <Box
      onClick={onClick}
      borderRadius={2}
      padding={1}
      bgcolor={yellow[100]}
      sx={{
        transition: 'box-shadow .3s ease',
        cursor: 'pointer',
        boxShadow: 'inset 2px 2px 13px -9px transparent',
        ':hover': {
          boxShadow: 'inset 2px 2px 13px -9px black',
        },
        border: `1px solid ${active ? grey[600] : 'transparent'}`,
      }}
      position="relative"
    >
      {note.isImportant && (
        <PushPin
          color="primary"
          sx={{
            position: 'absolute',
            width: '14px',
            height: '14px',
            top: '4px',
            right: '4px',
          }}
        />
      )}
      <Typography
        variant="body2"
        lineHeight={1.5}
        height={`${rows * 1.5}em`}
        sx={{
          backgroundImage: `repeating-linear-gradient(${yellow[100]} 0px, ${yellow[100]} 1.4em, ${grey[500]} 1.4em, ${yellow[100]} 1.5em)`,
          overflow: 'hidden',
        }}
      >
        {note.message}
      </Typography>
    </Box>
  );
};

export default TinyNote;
