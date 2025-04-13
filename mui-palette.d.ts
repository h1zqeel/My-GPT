// src/mui-palette.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  // 1️⃣ the run‑time object (theme.palette.surfaceA)
  interface Palette {
    surfaceA: Palette['primary'];
    surfaceB: Palette['primary'];
  }

  // 2️⃣ the options you pass into createTheme({ palette: { … } })
  interface PaletteOptions {
    surfaceA?: PaletteOptions['primary'];
    surfaceB?: PaletteOptions['primary'];
  }
}

export {}; // <‑‑ makes this file a module
