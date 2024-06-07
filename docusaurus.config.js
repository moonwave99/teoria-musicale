// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Appunti di Teoria Musicale",
    tagline: "Appunti di teoria musicale",
    url: "https://paino-blog.vercel.app",
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
        defaultLocale: "it",
        locales: ["it"],
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
                        ),
                    ],
                },
                blog: {
                    blogSidebarCount: 0,
                    truncateMarker: new RegExp("<Truncate/>"),
                    routeBasePath: "/articles",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "Appunti di Teoria Musicale",
                logo: {
                    alt: "Appunti di Teoria Musicale",
                    src: "img/logo.svg",
                },
                items: [],
            },
            footer: {
                style: "dark",
                copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" rel="noopener noreferrer" href="https://www.diegocaponera.com">Diego Caponera.</a>`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
