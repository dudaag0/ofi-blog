require('dotenv').config()
const fs = require('fs');
const path = require("path");
const math = require('remark-math');
const katex = require('rehype-katex');
const remarkMdi = require('remark-mdi');
const remarkDeflist = require('remark-deflist-simple');
const remarkKbd = require('remark-kbd-simple');
const remarkDetails = require('remark-details-simple');
const remarkUnderline = require('remark-underline');
const remarkImg2Fig = require('./src/plugins/remark-img2fig');
// const validateUuids = require('./src/plugins/validate-uuids');
const remarkFlex = require('./src/plugins/remark-flex');
const remarkLinks = require('./src/plugins/remark-links');
const remarkComments = require('./src/plugins/remark-comments');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EnsurePageId = require('./bin/ensure-page-id');

const admonitionConfig = {
  tag: ':::',
  keywords: ['note', 'tip', 'info', 'caution', 'danger', 'important', 'success', 'secondary', 'aufgabe', 'def', 'warning', 'warn', 'finding'],
};

const BASE_URL = '/ofi-blog/';
const GIT_COMMIT_SHA = process.env.DRONE_COMMIT_SHA || Math.random().toString(36).substring(7);
const OFFLINE_MODE = process.env.OFFLINE_MODE || false;
const VERSIONS = {
    current: {
      label: 'Material',
      banner: 'none'
    }
};

if (!process.env.DOCS_ONLY) {
  ['26e', '26P', '24ef'].forEach(version => {
    VERSIONS[version] = {
      label: version,
      banner: 'none'
    }
  });
}

/** @type { (string
  | {
      src: string;
      [key: string]: string | boolean | undefined;
    }
)[]} */
const scripts = []

if (process.env.UMAMI_SRC && process.env.UMAMI_ID) {
  scripts.push(
    {
      src: process.env.UMAMI_SRC,
      ['data-website-id']: process.env.UMAMI_ID,
      ['data-domains']: (process.env.DOMAIN || 'https://dudaag0.github.io').split('/').filter(w => !!w)[1],
      async: true,
      defer: true
    }
  )
}
  

/** @return {import('@docusaurus/types').DocusaurusConfig} */
async function createConfig() {
  return {
    title: 'Informatik',    
    tagline: 'Gymnasium Ettenheim',
    url: process.env.DOMAIN || 'https://dudaag0.github.io',
    baseUrl: BASE_URL,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    projectName: process.env.GH_PROJECT || 'ofi-blog', // Usually your repo name.
    trailingSlash: false,
    customFields: {
      GIT_COMMIT_SHA: GIT_COMMIT_SHA,
      DOCS_ONLY: process.env.DOCS_ONLY || false,
      AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID || 'no-id',
      DOMAIN: process.env.DOMAIN || 'https://dudaag0.github.io',
      OFFLINE_MODE: OFFLINE_MODE
    },
    i18n: {
      defaultLocale: 'de',
      locales: ['de'],
    },
    markdown: {
      mermaid: true,
    },  
    themeConfig: {
      mermaid: {
        theme: {light: 'default', dark: 'dark'},
      },
      docs: {
        sidebar: {
          hideable: true
        }
      },
      navbar: {
        title: 'Informatik',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: 'leistungskurs',
            position: 'left',
            label: 'Leistungskurs'
          },
        ]
      },
      footer: {
        style: 'dark',
        copyright: `<a 
                      class="footer__link-item"
                      href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de"
                    >
                      <img src="${BASE_URL}img/by-nc-sa.eu.svg" alt="CC-BY-NC-SA"> 
                      Silas Berger, geändert Annika Greif. 
                    </a>
                    <br />
                    <a 
                      class="badge badge--primary"
                      href="https://github.com/lebalz/ofi-blog/commit/${GIT_COMMIT_SHA}"
                    >
                    </a>`
      },
      prism: {
        theme: require('prism-react-renderer/themes/vsLight'),
        darkTheme: require('prism-react-renderer/themes/vsDark'),
        additionalLanguages: ['bash', 'powershell', 'css', 'java', 'asm6502', 'ruby', 'csharp']
      },
      algolia: OFFLINE_MODE ? undefined : {
        appId: process.env.ALGOLIA_APP_ID || "no-id",
        apiKey: process.env.ALGOLIA_API_KEY || "no-key",
        indexName: process.env.ALGOLIA_INDEX_NAME || "no-index",
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      }
    },
    presets: [
      [
        'classic',
        {
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            editUrl: (params) => {
              if (params.version === 'current') {
                return `https://dudaag0.github.io/ofi-blog/edit/main/${params.versionDocsDirPath}/${params.docPath}`
              }
              if (params.version === '24ef') {
                return 'https://dudaag0.github.io/ofi-blog/tree/main/docs'
              }
            },
            path: 'docs',
            includeCurrentVersion: true,
            lastVersion: 'current',
            showLastUpdateTime: true,
            routeBasePath: '/',
            admonitions: admonitionConfig,
            versions: VERSIONS,
            beforeDefaultRemarkPlugins: [
              remarkKbd,
              remarkLinks,
              remarkImg2Fig,
              [remarkUnderline, { marker: '__', classNames: ['underline'], tagType: 'strong' }]
            ],
            remarkPlugins: [
              math,
              remarkDeflist,
              remarkMdi,
              [remarkDetails, { marker: ':::', tags: ['details'], classNameMap: { details: undefined } }],
              remarkFlex,
              remarkComments
            ],
            rehypePlugins: [katex],
          },
          pages: {
            admonitions: admonitionConfig,
            beforeDefaultRemarkPlugins: [
              remarkKbd,
              remarkLinks,
              remarkImg2Fig,
              [remarkUnderline, { marker: '__', classNames: ['underline'], tagType: 'strong' }]
            ],
            remarkPlugins: [
              math,
              remarkDeflist,
              remarkMdi,
              [remarkDetails, { marker: ':::', tags: ['details'], classNameMap: { details: undefined } }],
              remarkFlex,
              remarkComments
            ],
            rehypePlugins: [katex],
          },
          blog: false,
          theme: {
            customCss: [
              require.resolve('./src/css/custom.scss'),
              require.resolve('./node_modules/react-image-gallery/styles/css/image-gallery.css')
            ]
          },
          sitemap: {
            changefreq: 'daily',
            priority: 0.5,
            ignorePatterns: ['/secure/**'],
            filename: 'sitemap.xml',
          },
        },
      ],
    ],
    plugins: [
      'docusaurus-plugin-sass',
      '@saucelabs/theme-github-codeblock',
      './src/plugins/brython-source.js',
      function (context, options) {
        return {
          name: 'raw-src-loader',
          configureWebpack(config, isServer, utils) {
            return {
              module: {
                rules: [
                  {
                    test: /\.raw\.*/,
                    type: 'asset/source'
                  },
                ],
              },
            };
          },
        };
      },
      function (context, options) {
        return {
          name: 'on-compile',
          configureWebpack(config, isServer, utils) {
            return {
              plugins: [
                {
                  apply: (compiler) => {
                    const cache = {};
                    compiler.hooks.watchRun.tap("Frontmatter-Plugin", () => {
                      if (process.env.NODE_ENV === 'development') {
                        if (compiler.modifiedFiles) {
                          compiler.modifiedFiles.forEach((f) => {
                            if (f.endsWith('.md') && !cache[f] && !f.includes('/versioned_docs/')) {
                              if (EnsurePageId(f)) {
                                console.log('Added Frontmatter to', f);
                              }
                              cache[f] = true;
                            }
                          });
                        }
                        if (compiler.removedFiles) {
                          compiler.removedFiles.forEach((f) => {
                            if (f.endsWith('.md')) {
                              delete cache[f]
                            }
                          })
                        }
                      }
                    });
                  },
                },
              ]
            }
          }
        }
      },
      function (context, options) {
        return {
          name: 'pdf-src-loader',
          configureWebpack(config, isServer, utils) {
            return {
              module: {
                rules: [
                  {
                    test: /canvas/,
                    use: 'null-loader'
                  },
                ],
              },
            };
          },
        };
      },
      function (context, options) {
        return {
          name: 'pdf-cmaps',
          configureWebpack(config, isServer, utils) {
            return {
              plugins: [
                new CopyWebpackPlugin({
                  patterns: [
                    // pdf-cmaps
                    {
                      from: 'node_modules/pdfjs-dist/cmaps/',
                      to: 'cmaps/'
                    },
                    // radial color picker cmaps
                    {
                      from: 'node_modules/@radial-color-picker/react-color-picker/dist/react-color-picker.min.css.map',
                      to: './static/'
                    }
                  ]
                }),
              ]
            };
          },
        };
      }
    ],
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
        integrity:
          'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
        crossorigin: 'anonymous',
      },
    ],
    scripts: [
      // Object format.
      ...scripts,
    ],
    themes: [
      '@docusaurus/theme-live-codeblock',
      'docusaurus-theme-frontmatter',
      '@docusaurus/theme-mermaid'
    ],
  }
}
module.exports = createConfig
