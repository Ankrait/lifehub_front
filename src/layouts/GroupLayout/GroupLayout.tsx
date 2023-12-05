import { FC, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { isNumber } from 'common/utils';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getGroup } from 'store/reducers/groupSlice';
import { Button, Grid, Typography } from '@mui/material';

const Group: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { group } = useAppSelector(state => state.group);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id || !isNumber(id)) return;

    dispatch(getGroup(+id));
  }, [id]);

  if (!group) {
    return <></>;
  }

  const groupNavigate = (val: 'notes' | 'plans' | 'settings') => () => {
    navigate(`/group/${group.id}/notes`);
  };

  return (
    <>
      <Grid marginBottom={2} container gap={1}>
        <Typography
          sx={{
            borderRadius: 2,
            bgcolor: 'orange',
            display: 'inline-block',
            padding: '4px',
          }}
          variant="h6"
        >
          {group.name}
        </Typography>
        <Button onClick={groupNavigate('notes')}>Notes</Button>
        <Button>Plans</Button>
        <Button>Settings</Button>
      </Grid>
      <Outlet />
    </>
  );
};

export default Group;
