import { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Input, Typography } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  addCollaborator,
  deleteCollaborator,
  getCollaborators,
} from 'store/reducers/groupSlice';
import { userService } from 'services/services';
import { IDeleteCollaboratorRequest } from 'services/services.interface';

const Settings: FC = () => {
  const [newUserName, setNewUserName] = useState('');
  const [canAdd, setCanAdd] = useState<number | false>(false);

  const { group, collaborators } = useAppSelector(state => state.group);
  const dispatch = useAppDispatch();

  const addNewUser = () => {
    if (!group || !canAdd) return;

    dispatch(
      addCollaborator({
        groupId: group?.id,
        userId: canAdd,
        role: 'USER',
      }),
    );
  };

  const deleteUser = (body: IDeleteCollaboratorRequest) => {
    dispatch(deleteCollaborator(body));
  };

  useEffect(() => {
    if (!group) return;

    dispatch(getCollaborators(group.id));
    setNewUserName('');
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(async () => {
      const isUser = await userService.checkByName(newUserName);
      setCanAdd(isUser);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [newUserName]);

  return (
    <Box>
      <Typography variant="h6">Настройки группы</Typography>
      <Grid container>
        <Grid item xs={4} container flexDirection="column" gap={2}>
          <Typography variant="h5">Участники</Typography>
          <Box>
            {collaborators.map((el, i) => (
              <Grid
                padding={1}
                container
                alignItems="center"
                justifyContent="space-between"
                borderTop={i === 0 ? '1px solid black' : ''}
                borderBottom="1px solid black"
              >
                <Typography variant="body1">{el.userName}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    deleteUser({
                      userId: el.userId,
                      groupId: el.groupId,
                    })
                  }
                >
                  <DeleteForever color="error" />
                </IconButton>
              </Grid>
            ))}
          </Box>
          <Grid container>
            <Input
              value={newUserName}
              onChange={e => setNewUserName(e.currentTarget.value)}
            />
            <Button disabled={!canAdd} onClick={addNewUser}>
              добавить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
