import { FC, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import { Add } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { createPlan, getGroupPlans } from 'store/reducers/planSlice';

import Plan from './Plan/Plan';

const Plans: FC = () => {
  const [sortLabels, setSortLabels] = useState<string[]>([]);

  const { plans, loading } = useAppSelector(state => state.plan);
  const { group } = useAppSelector(state => state.group);
  const dispatch = useAppDispatch();

  const createPlanHandler = () => {
    if (!group) return;

    dispatch(
      createPlan({
        groupId: group.id,
        message: '',
      }),
    );
  };

  useEffect(() => {
    if (!group) return;

    dispatch(getGroupPlans(group.id));
  }, []);

  return (
    <Box paddingBottom={3}>
      <Grid
        container
        marginBottom={4}
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <Grid item xs container alignItems="center">
          <Typography variant="h6">Планировщик</Typography>
          <IconButton onClick={createPlanHandler}>
            <Add />
          </IconButton>
        </Grid>
        {group && (
          <Grid item container xs={3} justifyContent="flex-end">
            <FormControl size='small' sx={{ width: 300 }}>
              <InputLabel>Сортировка по тэгу</InputLabel>
              <Select
                size="small"
                multiple
                value={sortLabels}
                onChange={e => {
                  const value = e.target.value;
                  setSortLabels(typeof value === 'string' ? [value] : value);
                }}
                input={<OutlinedInput label="Сортировка по тэгам" />}
                MenuProps={{ sx: { maxHeight: '300px' } }}
              >
                {group.labels.map(label => (
                  <MenuItem key={label.id} value={`${label.id}`}>
                    {label.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid container maxWidth={700} margin="0 auto">
        <Grid item paddingRight={2} xs sx={{ borderRight: '1px solid grey' }}>
          <Typography textAlign="center" marginBottom={0.5} variant="subtitle1">
            В процессе
          </Typography>
          {plans
            .filter(
              p =>
                !p.isFinished &&
                (sortLabels.length === 0 || sortLabels.includes(`${p.labelId}` || '0')),
            )
            .map(plan => (
              <Box key={plan.id} paddingY={1}>
                <Plan plan={plan} />
              </Box>
            ))}
        </Grid>
        <Grid item xs paddingLeft={2}>
          <Typography textAlign="center" marginBottom={0.5} variant="subtitle1">
            Выполнено
          </Typography>
          {plans
            .filter(
              p =>
                p.isFinished &&
                (sortLabels.length === 0 || sortLabels.includes(`${p.labelId}` || '0')),
            )
            .map(plan => (
              <Box key={plan.id} paddingY={1}>
                <Plan key={plan.id} plan={plan} />
              </Box>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Plans;
