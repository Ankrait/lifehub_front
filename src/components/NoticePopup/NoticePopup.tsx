import { FC, useEffect, useState } from 'react';
import { Alert } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { setNotice } from 'store/reducers/appSlice';

const NoticePopup: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { notice } = useAppSelector(state => state.app);

  const handleNoticePopupClose = (): void => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(setNotice(null));
    }, 500);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (notice) {
      setIsOpen(true);
      timer = setTimeout(() => {
        handleNoticePopupClose();
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <>
      {isOpen && notice && (
        <Alert
          onClick={handleNoticePopupClose}
          sx={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            cursor: 'pointer',
            transform: 'translateX(-50%)',
            zIndex: 2000,
          }}
          severity={notice.type}
        >
          {notice.message}
        </Alert>
      )}
    </>
  );
};
export default NoticePopup;
