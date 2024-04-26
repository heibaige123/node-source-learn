<div align="center"> <a href="https://fastify.dev/">
    <img
      src="https://github.com/fastify/graphics/raw/HEAD/fastify-landscape-outlined.svg"
      width="650"
      height="auto"
    />
  </a>
</div>

<div align="center">

[![CI](https://github.com/fastify/fastify/actions/workflows/ci.yml/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Package Manager
CI](https://github.com/fastify/fastify/workflows/package-manager-ci/badge.svg?branch=main)](https://github.com/fastify/fastify/actions/workflows/package-manager-ci.yml)
[![Web
SIte](https://github.com/fastify/fastify/workflows/website/badge.svg?branch=main)](https://github.com/fastify/fastify/actions/workflows/website.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/7585/badge)](https://bestpractices.coreinfrastructure.org/projects/7585)

</div>

<div align="center">

[![NPM
version](https://img.shields.io/npm/v/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
[![NPM
downloads](https://img.shields.io/npm/dm/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
[![Security Responsible
Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/fastify/fastify/blob/main/SECURITY.md)
[![Discord](https://img.shields.io/discord/725613461949906985)](https://discord.gg/fastify)
[![Contribute with Gitpod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod&color=blue)](https://gitpod.io/#https://github.com/fastify/fastify)
![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/fastify)

</div>

<br />

An efficient server implies a lower cost of the infrastructure, a better
responsiveness under load and happy users. How can you efficiently handle the
resources of your server, knowing that you are serving the highest number of
requests as possible, without sacrificing security validations and handy
development?

Enter Fastify. Fastify is a web framework highly focused on providing the best
developer experience with the least overhead and a powerful plugin architecture.
It is inspired by Hapi and Express and as far as we know, it is one of the
fastest web frameworks in town.

The `main` branch refers to the Fastify `v4` release. Check out the
[`v3.x` branch](https://github.com/fastify/fastify/tree/3.x) for `v3`.

### Table of Contents

-   [Quick start](#quick-start)
-   [Install](#install)
-   [Example](#example)
-   [Fastify v1.x and v2.x](#fastify-v1x-and-v2x)
-   [Core features](#core-features)
-   [Benchmarks](#benchmarks)
-   [Documentation](#documentation)
-   [Ecosystem](#ecosystem)
-   [Support](#support)
-   [Team](#team)
-   [Hosted by](#hosted-by)
-   [License](#license)

### Quick start

Create a folder and make it your current working directory:

```sh
mkdir my-app
cd my-app
```

Generate a fastify project with `npm init`:

```sh
npm init fastify
```

Install dependencies:

```sh
npm i
```

To start the app in dev mode:

```sh
npm run dev
```

For production mode:

```sh
npm start
```

Under the hood `npm init` downloads and runs [Fastify
Create](https://github.com/fastify/create-fastify), which in turn uses the
generate functionality of [Fastify CLI](https://github.com/fastify/fastify-cli).

### Install

To install Fastify in an existing project as a dependency:

Install with npm:

```sh
npm i fastify
```

Install with yarn:

```sh
yarn add fastify
```

### Example

```js
// Require the framework and instantiate it

// ESM
import Fastify from 'fastify';
const fastify = Fastify({
    logger: true,
});
// CommonJs
const fastify = require('fastify')({
    logger: true,
});

// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({hello: 'world'});
});

// Run the server!
fastify.listen({port: 3000}, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
```

with async-await:

```js
// ESM
import Fastify from 'fastify';
const fastify = Fastify({
    logger: true,
});
// CommonJs
const fastify = require('fastify')({
    logger: true,
});

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200);
    return {hello: 'world'};
});

fastify.listen({port: 3000}, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
```

Do you want to know more? Head to the <a
href="./docs/Guides/Getting-Started.md"><code><b>Getting Started</b></code></a>.

> ## Note
>
> `.listen` binds to the local host, `localhost`, interface by default
> (`127.0.0.1` or `::1`, depending on the operating system configuration). If
> you are running Fastify in a container (Docker,
> [GCP](https://cloud.google.com/), etc.), you may need to bind to `0.0.0.0`. Be
> careful when deciding to listen on all interfaces; it comes with inherent
> [security
> risks](https://web.archive.org/web/20170711105010/https://snyk.io/blog/mongodb-hack-and-secure-defaults/).
> See [the documentation](./docs/Reference/Server.md#listen) for more
> information.

### Core features

-   **Highly performant:** as far as we know, Fastify is one of the fastest web
    frameworks in town, depending on the code complexity we can serve up to 76+
    thousand requests per second.
-   **Extensible:** Fastify is fully extensible via its hooks, plugins and
    decorators.
-   **Schema based:** even if it is not mandatory we recommend to use [JSON
    Schema](https://json-schema.org/) to validate your routes and serialize your
    outputs, internally Fastify compiles the schema in a highly performant
    function.
-   **Logging:** logs are extremely important but are costly; we chose the best
    logger to almost remove this cost, [Pino](https://github.com/pinojs/pino)!
-   **Developer friendly:** the framework is built to be very expressive and help
    the developer in their daily use, without sacrificing performance and
    security.

### Benchmarks

**Machine:** EX41S-SSD, Intel Core i7, 4Ghz, 64GB RAM, 4C/8T, SSD.

**Method:**: `autocannon -c 100 -d 40 -p 10 localhost:3000` \* 2, taking the
second average

| Framework     | Version   |   Router?    | Requests/sec |
| :------------ | :-------- | :----------: | -----------: |
| Express       | 4.17.3    |   &#10003;   |       14,200 |
| hapi          | 20.2.1    |   &#10003;   |       42,284 |
| Restify       | 8.6.1     |   &#10003;   |       50,363 |
| Koa           | 2.13.0    |   &#10007;   |       54,272 |
| **Fastify**   | **4.0.0** | **&#10003;** |   **77,193** |
| -             |           |              |              |
| `http.Server` | 16.14.2   |   &#10007;   |       74,513 |

Benchmarks taken using https://github.com/fastify/benchmarks. This is a
synthetic, "hello world" benchmark that aims to evaluate the framework overhead.
The overhead that each framework has on your application depends on your
application, you should **always** benchmark if performance matters to you.

## Documentation

-   [**`Getting Started`**](./docs/Guides/Getting-Started.md)
-   [**`Guides`**](./docs/Guides/Index.md)
-   [**`Server`**](./docs/Reference/Server.md)
-   [**`Routes`**](./docs/Reference/Routes.md)
-   [**`Encapsulation`**](./docs/Reference/Encapsulation.md)
-   [**`Logging`**](./docs/Reference/Logging.md)
-   [**`Middleware`**](./docs/Reference/Middleware.md)
-   [**`Hooks`**](./docs/Reference/Hooks.md)
-   [**`Decorators`**](./docs/Reference/Decorators.md)
-   [**`Validation and Serialization`**](./docs/Reference/Validation-and-Serialization.md)
-   [**`Fluent Schema`**](./docs/Guides/Fluent-Schema.md)
-   [**`Lifecycle`**](./docs/Reference/Lifecycle.md)
-   [**`Reply`**](./docs/Reference/Reply.md)
-   [**`Request`**](./docs/Reference/Request.md)
-   [**`Errors`**](./docs/Reference/Errors.md)
-   [**`Content Type Parser`**](./docs/Reference/ContentTypeParser.md)
-   [**`Plugins`**](./docs/Reference/Plugins.md)
-   [**`Testing`**](./docs/Guides/Testing.md)
-   [**`Benchmarking`**](./docs/Guides/Benchmarking.md)
-   [**`How to write a good plugin`**](./docs/Guides/Write-Plugin.md)
-   [**`Plugins Guide`**](./docs/Guides/Plugins-Guide.md)
-   [**`HTTP2`**](./docs/Reference/HTTP2.md)
-   [**`Long Term Support`**](./docs/Reference/LTS.md)
-   [**`TypeScript and types support`**](./docs/Reference/TypeScript.md)
-   [**`Serverless`**](./docs/Guides/Serverless.md)
-   [**`Recommendations`**](./docs/Guides/Recommendations.md)

中文文档[地址](https://github.com/fastify/docs-chinese/blob/HEAD/README.md)

## Ecosystem

-   [Core](./docs/Guides/Ecosystem.md#core) - Core plugins maintained by the
    _Fastify_ [team](#team).
-   [Community](./docs/Guides/Ecosystem.md#community) - Community supported
    plugins.
-   [Live Examples](https://github.com/fastify/example) - Multirepo with a broad
    set of real working examples.
-   [Discord](https://discord.gg/D3FZYPy) - Join our discord server and chat with
    the maintainers.

## Support

Please visit [Fastify help](https://github.com/fastify/help) to view prior
support issues and to ask new support questions.

## Contributing

Whether reporting bugs, discussing improvements and new ideas or writing code,
we welcome contributions from anyone and everyone. Please read the [CONTRIBUTING](./CONTRIBUTING.md)
guidelines before submitting pull requests.

## Team

_Fastify_ is the result of the work of a great community. Team members are
listed in alphabetical order.

**Lead Maintainers:**

-   [**Matteo Collina**](https://github.com/mcollina),
    <https://twitter.com/matteocollina>, <https://www.npmjs.com/~matteo.collina>
-   [**Tomas Della Vedova**](https://github.com/delvedor),
    <https://twitter.com/delvedor>, <https://www.npmjs.com/~delvedor>
-   [**Manuel Spigolon**](https://github.com/eomm),
    <https://twitter.com/manueomm>, <https://www.npmjs.com/~eomm>
-   [**James Sumners**](https://github.com/jsumners),
    <https://twitter.com/jsumners79>, <https://www.npmjs.com/~jsumners>

### Fastify Core team

-   [**Tommaso Allevi**](https://github.com/allevo),
    <https://twitter.com/allevitommaso>, <https://www.npmjs.com/~allevo>
-   [**Harry Brundage**](https://github.com/airhorns/),
    <https://twitter.com/harrybrundage>, <https://www.npmjs.com/~airhorns>
-   [**David Mark Clements**](https://github.com/davidmarkclements),
    <https://twitter.com/davidmarkclem>,
    <https://www.npmjs.com/~davidmarkclements>
-   [**Matteo Collina**](https://github.com/mcollina),
    <https://twitter.com/matteocollina>, <https://www.npmjs.com/~matteo.collina>
-   [**Tomas Della Vedova**](https://github.com/delvedor),
    <https://twitter.com/delvedor>, <https://www.npmjs.com/~delvedor>
-   [**Dustin Deus**](https://github.com/StarpTech),
    <https://twitter.com/dustindeus>, <https://www.npmjs.com/~starptech>
-   [**Ayoub El Khattabi**](https://github.com/AyoubElk),
    <https://twitter.com/ayoubelkh>, <https://www.npmjs.com/~ayoubelk>
-   [**Denis Fäcke**](https://github.com/SerayaEryn),
    <https://twitter.com/serayaeryn>, <https://www.npmjs.com/~serayaeryn>
-   [**Carlos Fuentes**](https://github.com/metcoder95),
    <https://twitter.com/metcoder95>, <https://www.npmjs.com/~metcoder95>
-   [**Rafael Gonzaga**](https://github.com/rafaelgss),
    <https://twitter.com/_rafaelgss>, <https://www.npmjs.com/~rafaelgss>
-   [**Vincent Le Goff**](https://github.com/zekth)
-   [**Luciano Mammino**](https://github.com/lmammino),
    <https://twitter.com/loige>, <https://www.npmjs.com/~lmammino>
-   [**Luis Orbaiceta**](https://github.com/luisorbaiceta),
    <https://twitter.com/luisorbai>, <https://www.npmjs.com/~luisorbaiceta>
-   [**Maksim Sinik**](https://github.com/fox1t),
    <https://twitter.com/maksimsinik>, <https://www.npmjs.com/~fox1t>
-   [**Manuel Spigolon**](https://github.com/eomm),
    <https://twitter.com/manueomm>, <https://www.npmjs.com/~eomm>
-   [**James Sumners**](https://github.com/jsumners),
    <https://twitter.com/jsumners79>, <https://www.npmjs.com/~jsumners>
-   [**Aras Abbasi**](https://github.com/uzlopak),
    <https://www.npmjs.com/~uzlopak>

### Fastify Plugins team

-   [**Matteo Collina**](https://github.com/mcollina),
    <https://twitter.com/matteocollina>, <https://www.npmjs.com/~matteo.collina>
-   [**Harry Brundage**](https://github.com/airhorns/),
    <https://twitter.com/harrybrundage>, <https://www.npmjs.com/~airhorns>
-   [**Tomas Della Vedova**](https://github.com/delvedor),
    <https://twitter.com/delvedor>, <https://www.npmjs.com/~delvedor>
-   [**Ayoub El Khattabi**](https://github.com/AyoubElk),
    <https://twitter.com/ayoubelkh>, <https://www.npmjs.com/~ayoubelk>
-   [**Carlos Fuentes**](https://github.com/metcoder95),
    <https://twitter.com/metcoder95>, <https://www.npmjs.com/~metcoder95>
-   [**Vincent Le Goff**](https://github.com/zekth)
-   [**Salman Mitha**](https://github.com/salmanm),
    <https://www.npmjs.com/~salmanm>
-   [**Maksim Sinik**](https://github.com/fox1t),
    <https://twitter.com/maksimsinik>, <https://www.npmjs.com/~fox1t>
-   [**Frazer Smith**](https://github.com/Fdawgs), <https://www.npmjs.com/~fdawgs>
-   [**Manuel Spigolon**](https://github.com/eomm),
    <https://twitter.com/manueomm>, <https://www.npmjs.com/~eomm>
-   [**Simone Busoli**](https://github.com/simoneb),
    <https://twitter.com/simonebu>, <https://www.npmjs.com/~simoneb>
-   [**Gürgün Dayıoğlu**](https://github.com/gurgunday),
    <https://www.npmjs.com/~gurgunday>

### Great Contributors

Great contributors on a specific area in the Fastify ecosystem will be invited
to join this group by Lead Maintainers.

-   [**dalisoft**](https://github.com/dalisoft), <https://twitter.com/dalisoft>,
    <https://www.npmjs.com/~dalisoft>
-   [**Luciano Mammino**](https://github.com/lmammino),
    <https://twitter.com/loige>, <https://www.npmjs.com/~lmammino>
-   [**Evan Shortiss**](https://github.com/evanshortiss),
    <https://twitter.com/evanshortiss>, <https://www.npmjs.com/~evanshortiss>

**Past Collaborators**

-   [**Çağatay Çalı**](https://github.com/cagataycali),
    <https://twitter.com/cagataycali>, <https://www.npmjs.com/~cagataycali>
-   [**Trivikram Kamat**](https://github.com/trivikr),
    <https://twitter.com/trivikram>, <https://www.npmjs.com/~trivikr>
-   [**Cemre Mengu**](https://github.com/cemremengu),
    <https://twitter.com/cemremengu>, <https://www.npmjs.com/~cemremengu>
-   [**Nathan Woltman**](https://github.com/nwoltman),
    <https://twitter.com/NathanWoltman>, <https://www.npmjs.com/~nwoltman>
-   [**Ethan Arrowood**](https://github.com/Ethan-Arrowood/),
    <https://twitter.com/arrowoodtech>, <https://www.npmjs.com/~ethan_arrowood>

## Hosted by

[<img
src="https://github.com/openjs-foundation/artwork/blob/main/openjs_foundation/openjs_foundation-logo-horizontal-color.png?raw=true"
width="250px;"/>](https://openjsf.org/projects)

We are a [At-Large
Project](https://github.com/openjs-foundation/cross-project-council/blob/HEAD/PROJECT_PROGRESSION.md#at-large-projects)
in the [OpenJS Foundation](https://openjsf.org/).

## Sponsors

Support this project by becoming a [SPONSOR](./SPONSORS.md)!
Fastify has an [Open Collective](https://opencollective.com/fastify)
page where we accept and manage financial contributions.

## Acknowledgements

This project is kindly sponsored by:

-   [NearForm](https://nearform.com)
-   [Platformatic](https://platformatic.dev)

Past Sponsors:

-   [LetzDoIt](https://www.letzdoitapp.com/)

This list includes all companies that support one or more of the team members
in the maintenance of this project.

## License

Licensed under [MIT](./LICENSE).

For your convenience, here is a list of all the licenses of our production
dependencies:

-   MIT
-   ISC
-   BSD-3-Clause
-   BSD-2-Clause
