import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "康軒學習網｜YOURCLASS專屬你的雲端課堂 - 我的課程",
  description: "配合你的步調，影音課程、試題複習、診斷學力，升學與素養一站全滿足。不怕學校進度跟不上；家教、補習時間不夠用。在康軒學習網，擁有專屬你的雲端課堂，跟著康軒不停學！",

  extends: vikeReact,
} satisfies Config;
