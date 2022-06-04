// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Paino Blog",
  tagline: "Piano, painless",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "mwlabs", // Usually your GitHub org/user name.
  projectName: "paino-blog", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve(
              "./node_modules/@moonwave99/paino/src/styles/paino.css"
            )
          ]
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Paino",
        logo: {
          alt: "Paino",
          src: "img/logo.svg"
        },
        items: [
          { to: "/blog", label: "Articles", position: "left" },
          {
            href: "https://github.com/moonwave99/paino",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} mwlabs. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
