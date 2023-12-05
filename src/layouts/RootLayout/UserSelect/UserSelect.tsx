import { FC, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  Typography,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { KeyboardArrowDown } from '@mui/icons-material';

import { logout } from 'store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { setGroupCreatorOpened } from 'store/reducers/groupSlice';

const UserSelect: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(state => state.auth);
  const { groups } = useAppSelector(state => state.group);

  const [isOpened, setOpened] = useState(false);

  const onExitClick = () => {
    dispatch(logout());
  };
  const onGroupCreateClick = () => {
    dispatch(setGroupCreatorOpened(true));
  };

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
        sx={{ bgcolor: grey[100], borderRadius: 1 }}
      >
        <ClickAwayListener onClickAway={closeHandler}>
          <MenuList>
            {groups.length !== 0 && (
              <>
                {groups.map(group => (
                  <MenuItem
                    key={group.id}
                    sx={{ gap: 1 }}
                    onClick={() => navigate(`/group/${group.id}`)}
                  >
                    <Avatar
                      sx={{
                        bgcolor: red[300],
                        width: '28px',
                        height: '28px',
                      }}
                      alt={group.name}
                      src={group.image || undefined}
                    >
                      {group.name.at(0)}
                    </Avatar>
                    <Typography variant="h6">{group.name}</Typography>
                  </MenuItem>
                ))}
                <Divider />
              </>
            )}
            <MenuItem onClick={onGroupCreateClick} sx={{ padding: '3px 12px' }}>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14, textAlign: 'center' }}
                sx={{ whiteSpace: 'nowrap', fontSize: 2 }}
                primary="Создать группу"
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
