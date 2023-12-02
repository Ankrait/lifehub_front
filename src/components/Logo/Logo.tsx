import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

type LogoType = 'large' | 'default';

const variants = {
  large: 'h3',
  default: 'h4',
} as const;

interface ILogo {
  size?: LogoType;
}

const Logo: FC<ILogo> = ({ size = 'default' }) => {
  return (
    <Link to="/">
      <Typography
        color="black"
        textAlign="center"
        variant={variants[size]}
        fontWeight={600}
      >
        LifeHub
      </Typography>
    </Link>
  );
};

export default Logo;
