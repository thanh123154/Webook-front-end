import { MantineProvider, type MantineProviderProps, type MantineTheme } from "@mantine/core";
import React from "react";

import { fonts } from "./fonts";

export const ThemeProvider: React.FC<MantineProviderProps> = ({ children }) => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: "light",
        fontFamily: fonts.inter.style.fontFamily,
        headings: { fontFamily: fonts.rigatoni.style.fontFamily, fontWeight: 700 },
        components: {
          Text: {
            styles: {
              root: {
                fontWeight: 500,
              },
            },
          },
        },
        globalStyles: (theme: MantineTheme) => ({
          html: {
            [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
              fontSize: "calc(10 * (100vw/1500))",
            },
          },
          body: {
            backgroundColor: "#f2f2f2",
          },
          a: {
            color: "#000",
            textDecoration: "none",
          },
        }),
      }}
    >
      {children}
    </MantineProvider>
  );
};
