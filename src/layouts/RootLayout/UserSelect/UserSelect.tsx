import { FC, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Popper,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import { logout } from 'store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { grey } from '@mui/material/colors';
import { setGroupCreatorOpened } from 'store/reducers/groupSlice';

const UserSelect: FC = () => {
  const [isOpened, setOpened] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { groups } = useAppSelector(state => state.group);

  const dispatch = useAppDispatch();

  const onExitClick = () => {
    dispatch(logout());
  };
  const onGroupCreateClick = () => {
    dispatch(setGroupCreatorOpened(true));
  }

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const closeHandler = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpened(false);
  };

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Box display="inline-block">
      <ListItemButton
        ref={anchorRef}
        sx={{ gap: 1 }}
        onClick={() => setOpened(prev => !prev)}
      >
        <ListItemText primary={user.login} />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            transform: isOpened ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s',
          }}
        />
      </ListItemButton>
      <Popper
        anchorEl={anchorRef.current}
        placement="bottom-end"
        open={isOpened}
        disablePortal
        sx={{bgcolor: grey[100], borderRadius: 1, }}
      >
        <ClickAwayListener onClickAway={closeHandler}>
          <MenuList>
            {groups.length !== 0 && (
              <>
                {groups.map(group => (
                  <MenuItem>
                    <Avatar sx={{ bgcolor: 'red' }} alt={group.name} src={group.image}>
                      {group.name}
                    </Avatar>
                  </MenuItem>
                ))}
                <Divider />
              </>
            )}
            <MenuItem onClick={onGroupCreateClick} sx={{ padding: '3px 12px' }}>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                sx={{ whiteSpace: 'nowrap', fontSize: 2 }}
                primary="Добавить группу"
              />
            </MenuItem>
            <MenuItem onClick={onExitClick} sx={{ padding: '3px 12px' }}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 14,
                  color: 'red',
                  textAlign: 'center',
                }}
                sx={{ whiteSpace: 'nowrap' }}
                primary="Выход"
              />
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default UserSelect;
