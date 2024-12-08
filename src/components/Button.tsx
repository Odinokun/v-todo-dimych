import { FC } from 'react';

type PropsType = {
  className?: string;
  onClick: () => void;
  title: string;
};

export const Button: FC<PropsType> = ({ className, onClick, title }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};
