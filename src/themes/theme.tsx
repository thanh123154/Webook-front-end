import {
  type ColorScheme,
  MantineProvider,
  type MantineProviderProps,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";

import { fonts } from "./fonts";

export const ThemeProvider: React.FC<MantineProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: theme,
        components: {
          Title: {
            styles: {
              root: {
                // color: "#29363D",
              },
            },
          },
          Button: {
            defaultProps: {
              tt: "uppercase",
              fw: 700,
              radius: "xl",
              variant: "gradient",
            },
          },
        },
        globalStyles: () => ({
          html: {
            scrollBehavior: "smooth",
          },
          "body *": {
            fontFamily: `${fonts.poppins.style.fontFamily} !important`,
          },
          a: {
            color: "unset",
            textDecoration: "none",
          },
        }),
      }}
    >
      <NotificationsProvider>{children}</NotificationsProvider>
    </MantineProvider>
  );
};
