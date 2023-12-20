import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

import { IPlan } from 'services/services.interface';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { deletePlan, updatePlan } from 'store/reducers/planSlice';
import { LabelSelect } from 'components';

interface IPlanProps {
  plan: IPlan;
}

const Plan: FC<IPlanProps> = ({ plan }) => {
  const [isLabelSelectOpened, setLabelSelectOpened] = useState(false);
  const [value, setValue] = useState(plan.message);

  const { group } = useAppSelector(state => state.group);
  const dispatch = useAppDispatch();

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const toggleFinished = () => {
    dispatch(
      updatePlan({
        id: plan.id,
        isFinished: !plan.isFinished,
        message: value,
      }),
    );
  };

  const deleteHandler = () => {
    dispatch(deletePlan(plan.id));
  };

  const setLabelHandler = async (id: number | null) => {
    await dispatch(
      updatePlan({
        id: plan.id,
        labelId: id,
      }),
    );
  };

  useEffect(() => {
    setValue(plan.message);
  }, []);

  useEffect(() => {
    if (value === plan.message) return;

    const timer = setTimeout(() => {
      dispatch(
        updatePlan({
          id: plan.id,
          message: value,
        }),
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <Paper sx={{ borderRadius: 2, padding: 1 }} elevation={2}>
      {plan.dateTo && <Typography variant="caption">{plan.dateTo}</Typography>}
      <TextField
        sx={{ width: '100%' }}
        size="small"
        variant="standard"
        placeholder="Новый план"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <Box paddingY={1}>
        {plan.label ? (
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label={plan.label.text}
            onDelete={() => setLabelHandler(null)}
          />
        ) : (
          <>
            <Button
              ref={anchorRef}
              size="small"
              onClick={() => setLabelSelectOpened(true)}
            >
              + добавить тэг
            </Button>
          </>
        )}
        <LabelSelect
          opened={isLabelSelectOpened}
          onClose={() => setLabelSelectOpened(false)}
          anchorEl={anchorRef.current}
          data={group?.labels || []}
          onSelect={setLabelHandler}
          plan={plan}
        />
      </Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox size="small" checked={plan.isFinished} onChange={toggleFinished} />
          }
          label="Завершено"
        />
        <IconButton onClick={deleteHandler} size="small">
          <DeleteForever color="error" />
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default Plan;
