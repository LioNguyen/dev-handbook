import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light",

  // Brand
  brandTitle: "License Manager",
  brandUrl: "https://staging-license-app.dnb-soft.com/",
  brandImage: "/logo-name-light.svg",
  brandTarget: "_blank",
});

addons.setConfig({
  theme,
});
