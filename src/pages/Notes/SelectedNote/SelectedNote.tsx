import { FC, useEffect, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import { DoneAll, PushPin } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { updateNote } from 'store/reducers/noteSlice';
import { LoadingEnum } from 'common/interfaces';

interface ISelectedNote {
  id: number;
}

const SelectedNote: FC<ISelectedNote> = ({ id }) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => state.note.notes).find(el => el.id === id)!;
  const { loading } = useAppSelector(state => state.note);

  const [value, setValue] = useState(note.message);
  const [saved, setSaved] = useState(false);

  const toggleImportant = () => {
    if (loading === LoadingEnum.UPDATE) return;

    dispatch(
      updateNote({
        id: note.id,
        isImportant: !note.isImportant,
      }),
    );
  };

  useEffect(() => {
    setValue(note.message);
  }, [note.id]);

  useEffect(() => {
    if (value === note.message) return;

    const timer = setTimeout(() => {
      dispatch(
        updateNote({
          id: note.id,
          message: value,
        }),
      );
      setSaved(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    const reset = () => {
      setSaved(false);
    };

    let timer: NodeJS.Timer;
    if (saved) {
      timer = setTimeout(() => {
        reset();
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [saved]);

  return (
    <Box
      bgcolor={yellow[100]}
      padding={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          {saved && (
            <>
              <DoneAll
                htmlColor={green[500]}
                sx={{
                  width: '16px',
                  height: '16px',
                }}
              />
              <Typography variant="caption" lineHeight={1} color={green[500]}>
                Сохранено
              </Typography>
            </>
          )}
        </Box>
        <IconButton
          disabled={loading === LoadingEnum.UPDATE}
          onClick={toggleImportant}
          size="small"
        >
          <PushPin color={note.isImportant ? 'primary' : 'action'} />
        </IconButton>
      </Box>
      <TextField
        value={value}
        onChange={e => {
          setValue(e.currentTarget.value);
        }}
        multiline
        variant="standard"
        rows={12}
        sx={{
          width: '100%',
          height: '100%',
          padding: 0,
        }}
        inputProps={{
          style: {
            lineHeight: 1.5,
            backgroundImage: `repeating-linear-gradient(${yellow[100]} 0px, ${yellow[100]} 1.4em, ${grey[500]} 1.5em)`,
          },
        }}
      />
    </Box>
  );
};

export default SelectedNote;
