import { Box, type BoxProps } from '@mui/material';

/** Conteneur d'écran : padding standard à l'intérieur du cadre AppShell. */
export function Screen({ children, sx, ...rest }: BoxProps) {
  return (
    <Box sx={{ px: 2, py: 3, flex: 1, ...sx }} {...rest}>
      {children}
    </Box>
  );
}

export default Screen;
