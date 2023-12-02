import { FC } from 'react';
import { Dialog, DialogTitle } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { setGroupCreatorOpened } from 'store/reducers/groupSlice';

const GroupCreator: FC = () => {
  const dispatch = useAppDispatch();

  const isOpened = useAppSelector(state => state.group.isGroupCreatorOpened);
  const closeHandler = () => {
    dispatch(setGroupCreatorOpened(false));
  };

  return (
    <Dialog open={isOpened} onClose={closeHandler}>
      <DialogTitle>Создать группу</DialogTitle>
    </Dialog>
  );
};

export default GroupCreator;
