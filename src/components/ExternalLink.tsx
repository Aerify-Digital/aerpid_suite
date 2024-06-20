import { Link } from '@mui/material';
import React from 'react';

interface ExternalLinkProps {
  url: string;
  children: React.ReactNode;
}

export default function ExternalLink({ url, children }: ExternalLinkProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const api = (window as any).electronAPI;
    api.openExternal(url);
  };

  return (
    <Link href={url} onClick={handleClick} color="primary">
      {children}
    </Link>
  );
}
