import { FC } from 'react';

import { Typography } from '@mui/material';

import { useAppSelector } from 'common/hooks';

const GroupMain: FC = () => {
  const { group } = useAppSelector(state => state.group);

  if (!group) {
    return <></>;
  }

  return (
    <>
      <Typography>Количество записей: {group.stats.notesCount}</Typography>
      <Typography>
        Количество не решенных задач: {group.stats.plansCount.started}
      </Typography>
      <Typography>
        Количество завершенных задач: {group.stats.plansCount.finished}
      </Typography>
    </>
  );
};

export default GroupMain;
