import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { useAppDispatch } from 'common/hooks';
import { createLabel } from 'store/reducers/groupSlice';
import { LabelType } from 'common/interfaces';
import { updatePlan } from 'store/reducers/planSlice';

interface ILabelCreator {
  opened: boolean;
  onClose: () => void;
  groupId: number;
  planId?: number;
}

const LabelCreator: FC<ILabelCreator> = ({ opened, onClose, groupId, planId }) => {
  const [mes, setMes] = useState('');
  const [type, setType] = useState<LabelType>('ALL');

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const createActionResult = await dispatch(
      createLabel({
        text: mes,
        groupId,
        type,
      }),
    );

    if (createLabel.fulfilled.match(createActionResult)) {
      if (planId) {
        await dispatch(
          updatePlan({
            id: planId,
            labelId: createActionResult.payload.id,
          }),
        );
      }

      onClose();
    }
  };

  return (
    <Dialog open={opened} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Новый тэг</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2}>
          <Input
            placeholder="Название"
            size="small"
            value={mes}
            onChange={e => setMes(e.currentTarget.value)}
          />
          <FormControl variant="standard">
            <InputLabel>Age</InputLabel>
            <Select
              value={type}
              onChange={e => setType(e.target.value as LabelType)}
              label="Тип"
            >
              <MenuItem value={'ALL'}>Всем</MenuItem>
              <MenuItem value={'TASK'}>Планы</MenuItem>
              {/* <MenuItem value={LabelTypeEnum.FINANCE}>Финансы</MenuItem> */}
            </Select>
          </FormControl>
          <Button onClick={onSubmit}>Создать</Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LabelCreator;
