import { FC } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { createGroup, setGroupCreatorOpened } from 'store/reducers/groupSlice';
import { ICreateGroupRequest } from 'services/services.interface';

const scheme = yup.object({
  name: yup.string().min(4).max(16).required('Поле обязательно'),
  image: yup.string(),
});

const GroupCreator: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateGroupRequest>({
    mode: 'all',
    resolver: yupResolver(scheme),
  });

  const { isGroupLoading, isGroupCreatorOpened: isOpened } = useAppSelector(
    state => state.group,
  );
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(setGroupCreatorOpened(false));
  };

  const onSubmit = async (data: ICreateGroupRequest) => {
    const actionResult = await dispatch(createGroup(data));
    if (createGroup.fulfilled.match(actionResult)) {
      closeHandler();
    }
  };

  return (
    <Dialog open={isOpened} onClose={closeHandler} fullWidth maxWidth="xs">
      <DialogTitle>Создать группу</DialogTitle>
      <DialogContent sx={{ paddingTop: '6px' }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          paddingTop={1}
          gap={2}
        >
          <TextField
            {...register('name')}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
            label="Название группы"
            size="small"
          />
          <Button
            type="submit"
            disabled={isGroupLoading || !isValid}
            variant="contained"
            color="success"
          >
            Создать
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GroupCreator;
