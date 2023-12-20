import { FC, useState } from 'react';
import {
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { ILabel, IPlan } from 'services/services.interface';
import { LabelCreator } from 'components';

interface ILabelSelect {
  anchorEl: HTMLElement | null;
  opened: boolean;
  onClose: () => void;

  data: ILabel[];
  onSelect: (id: number) => void;
  plan: IPlan;
}

const LabelSelect: FC<ILabelSelect> = ({
  opened,
  anchorEl,
  onClose,
  data,
  onSelect,
  plan,
}) => {
  const [isLabelCreatorOpened, setLabelCreatorOpened] = useState(false);

  return (
    <>
      <Popper
        anchorEl={anchorEl}
        placement="bottom-end"
        open={opened}
        sx={{
          bgcolor: grey[100],
          borderRadius: 1,
          boxShadow: '0 0 10px -4px black',
          maxHeight: '300px',
          overflow: 'auto',
        }}
      >
        <ClickAwayListener onClickAway={onClose}>
          <MenuList>
            <Button size="small" onClick={() => setLabelCreatorOpened(true)}>
              Создать новый
            </Button>
            {data.map(label => (
              <MenuItem
                key={label.id}
                onClick={() => {
                  onSelect(label.id);
                  onClose();
                }}
              >
                <Typography variant="subtitle2">{label.text}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Popper>
      <LabelCreator
        opened={isLabelCreatorOpened}
        onClose={() => {
          setLabelCreatorOpened(false);
          onClose();
        }}
        groupId={plan.groupId}
        planId={plan.id}
      />
    </>
  );
};

export default LabelSelect;
