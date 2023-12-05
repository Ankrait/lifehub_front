import { FC, useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { TableRows, Window } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { createNote, getGroupNotes } from 'store/reducers/noteSlice';
import { LoadingEnum } from 'common/interfaces';
import TinyNote from './TinyNote/TinyNote';
import SelectedNote from './SelectedNote/SelectedNote';

const Notes: FC = () => {
  const [isList, setIsList] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { notes, loading } = useAppSelector(state => state.note);
  const { group } = useAppSelector(state => state.group);
  const dispatch = useAppDispatch();

  const selectNoteHandler = (noteId: number) => {
    setSelectedId(prev => {
      if (!prev || prev !== noteId) {
        return noteId;
      }

      return null;
    });
  };

  const createNoteHandler = () => {
    if (!group || loading === LoadingEnum.CREATE) return;
    dispatch(createNote({ groupId: group.id, message: '' }));
  };

  useEffect(() => {
    if (!group) return;

    dispatch(getGroupNotes(group.id));
  }, []);

  return (
    <Grid container alignItems="flex-start">
      <Grid
        item
        xs
        container
        direction={isList ? 'column' : 'row'}
        bgcolor={grey[100]}
        padding={2}
        borderRadius={3}
      >
        <Grid
          item
          container
          padding={1}
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid xs={9} item container alignItems="center" gap={3}>
            <Typography variant="h6">Заметки</Typography>
            <Button
              sx={{
                bgcolor: red[100],
                color: grey[900],
                fontSize: '12px',
              }}
              variant="text"
              onClick={createNoteHandler}
              disabled={loading === LoadingEnum.CREATE}
            >
              Добавить заметку
            </Button>
          </Grid>
          <Grid item xs container justifyContent="flex-end">
            <IconButton onClick={() => setIsList(true)}>
              <TableRows color={isList ? 'primary' : 'disabled'} />
            </IconButton>
            <IconButton onClick={() => setIsList(false)}>
              <Window color={!isList ? 'primary' : 'disabled'} />
            </IconButton>
          </Grid>
        </Grid>
        {notes.map(note => (
          <Grid key={note.id} padding={1} item xs={3}>
            <TinyNote
              note={note}
              onClick={() => selectNoteHandler(note.id)}
              active={note.id === selectedId}
            />
          </Grid>
        ))}
      </Grid>

      {!!selectedId && (
        <Grid paddingLeft={2} item xs={4}>
          <SelectedNote id={selectedId} />
        </Grid>
      )}
    </Grid>
  );
};

export default Notes;
