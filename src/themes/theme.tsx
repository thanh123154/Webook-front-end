import { type ColorScheme, MantineProvider, type MantineProviderProps } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";

import { fonts } from "./fonts";

export const ThemeProvider: React.FC<MantineProviderProps> = ({ children }) => {
  const [theme] = useLocalStorage<ColorScheme>({
    key: "Mantine theme",
    defaultValue: "dark",
  });

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: theme,
        colors: {
          brand: [
            "#EBFBEE",
            "#D3F9D8",
            "#B2F2BB",
            "#8CE99A",
            "#69DB7C",
            "#51CF66",
            "#40C057",
            "#37B24D",
            "#2F9E44",
            "#2B8A3E",
          ],
        },
        primaryColor: "brand",
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
