import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    surfaceA: Palette['primary'];
    surfaceB: Palette['primary'];
  }

  interface PaletteOptions {
    surfaceA?: PaletteOptions['primary'];
    surfaceB?: PaletteOptions['primary'];
  }
}

export {};
