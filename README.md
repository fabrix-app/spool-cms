# spool-cms

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

## Content Management built for speed, scalability, testing, and Developer Joy

The Proxy Engine Router is an Express middleware built to be used on Fabrixjs with Proxy Engine.
It's purpose is to allow for easy development, SEO, and AAA (Triple A - Automated Analytical Assessment) testing from the ground up (a concept developed by [Scott Wyatt](https://github.com/scott-wyatt)). This means that you can automate UI testing and can still use your own controllers to handle views and add Proxy Route content to them as needed.

Views are stored in either a Flat File database or joined with a Postgres database, and are cache-able in a document store such as Redis.
Each view has a series of tests that are displayed based on a weight, threshold, and baseline for a given demographic.

Each time a view is run, the engine will determine which series to display and track the runs for a given view and positive/negative control conversions for the demographic to score it.
Once a Series threshold and baseline is met, it becomes the default view for a given demographic.

To read why this is important, checkout out our [ article on AAA Testing](http://cali-style.com/blog/pioneering-aaa-webpage-testing)

Say good bye to A/B testing as AAA testing can handle hundreds of different series test at once for each view in a web app and it can do it automatically.  This makes UI testing purely iterative and personable.
 - Want to find the best UI for a time of day and show it at the right time?
 - Want to find the best layouts for males or females or trans and show it to the corresponding audience automatically?

AAA Testing isn't about one ~~size~~ site fits all, it's about finding the right layout per audience. Series documents are given a test number, and version. They default to the latest version, but the default can be changed to any version while keeping the run and score.
Large changes to any version should be given another test number. The documents are markdown documents with yaml that allow you to use normal markdown, HTML, or even your own embeds.

Use your own mechanisms to track negative and positive interactions and then feed them back to Proxy Engine to adjust the score.

Use your own mechanisms to determine what qualifies as a demographic.

## Principles 
One of the most difficult feats when dealing with a CMS, from a developer standpoint, is continuity:

- Developing well crafted pages in a CMS requires a local or staging DB and then taking approved changes live in some slow error prone fashion.
- A/B Testing requires that Marketers and UX specialist have easy access to creating variations of views and running tests. 
- Database driven view states are notoriously slow.
- Database content with large amounts of HTML is slow to search.

All of these are issues for the Modern Web, especially for web apps built as single page applications. 

Proxy Engine's router takes care of these pain points by: 

- Giving developers a flat file database for component driven views with a high amount of version control.
- Giving Marketers/UXs an easy way to create variations and automatically run tests when given an appropriate editor.
- Making documents cache-able and still retaining tests and version control across millions of pages.
- Using the Metadata for each page makes using postgres' JSONB keyword searching fast (and already SEO ready), or easily connect postrgres to an Elasticsearch engine to make content searching even better.

### Additional Use Cases
- Assign demographics to users and display or withhold content based on it.
- Complete version control for technical manuals and blogs
- Flatfile CMS for non database driven web apps.
- Versioned display structure for web apps using Angular2 ngRX or React Flux.

### Sitemap
- Proxy Router is very fast with an average of just a few millaseconds per non-cached page render and less than a millasecond when cached. In addition to rendering a page, it also sitemaps a page's children and sitemaps all content on server start/edit.

### Gotchas
- This style of CMS requires a "Single Source of Truth" for Frontend Components to bind too. Try using Redux or ngRX for your frontend.
- Mechanisms to determine/set Score and Demographic are up to you.

## Dependencies
### Supported ORMs
| Repo          |  Build Status (edge)                  |
|---------------|---------------------------------------|
| [spool-sequelize](https://github.com/fabrixjs/spool-sequelize) | [![Build status][ci-sequelize-image]][ci-sequelize-url] |

### Supported Webserver
| Repo          |  Build Status (edge)                  |
|---------------|---------------------------------------|
| [spool-express](https://github.com/fabrixjs/spool-express) | [![Build status][ci-express-image]][ci-express-url] |


## Install

```sh
$ npm install --save spool-cms
```

## Configure

```js
// config/main.ts
export const main = {
  spools: [
    // ... other spools
    require('spool-cms')
  ]
}
```

```js
// config/web.ts
  middlewares: {
    order: [
      // ... other middleware
      'cms', // cms must be before router
      'router'
    ],
    cms: function(req, res, next){
      return require('@fabrix/spool-cms').Middleware.cms(req, res, next)
    }
  }
```
```js
// config/cms.ts
export const cms = {
  // The Default Extension to use when creating/updating/reading files, falls back to either .md or .html
  default_extension: '.md',
  // Default Threshold
  threshold: 100,
  // Default Baseline
  baseline: 0.75,
  // Default Weight
  weight: 50,
  // Default Flat File Folder
  folder: 'content',
  // Default name for "series"
  series: 'series',
  // Force Flat File and ignore DB
  force_fl: true,
  // The number of controls to enqueue before flushing to processor.
  flush_at: 20,
  // The number of milliseconds to wait before flushing the queue automatically to processor.
  flush_after: 10000,
  // Cache
  cache: {
    // The redis datastore prefix
    prefix: 'pxy',
    // Allow Caching
    allow: true,
    // Milliseconds before cache is ejected
    eject: 10000
  }
}
```

### Content Folder
By default the Proxy Route content directory is `content` in the root directory of your application.  However, it can changed to any directory or even a node_module by setting the `folder` value in `config/cms`. Whatever the content folder, the file structure must follow these guidelines:

- Every directory must have a series directory that contains a named test directory eg. `a0` with a SemVer versioned markdown document.
- Named test directories follow this pattern: `a0`, `b0`, `c0` etc.  Upon exceeding `z0` change to `a1`, `b1`, `c1` etc.
- Directories that start with wild cards eg. `:world` or `*` will match express routes.
- Files must end in a `.md` (markdown) or `.html` (HTML) file extension, but a test directory must be of all one file type.

##### Example
```
 - content
   - hello
     - :world
       - series
         - a0
           - 0.0.0.md
     - earth
       - series
         - a0
           - 0.0.0.md
     - html
       - series
         - a0
           - 0.0.0.html
           - 0.0.1.html
     - series
       - a0
         - 0.0.0.md
   - series
     - a0
       - 0.0.0.md
       - 0.0.1.md
     - b0
       - 0.0.0.md
```

### req.locals
Proxy Route merges the document's id, series, version, and metadata with req.locals so it can be used in any view template engine required.
To access it in your template engine use the request's local variable `cms.document` and `cms.meta`

### Ignore Routes and Alternate Routes
When the fabrix app starts, three configurations are added to fabrixApp.config.cms:
-  `getRoutes`
- `ignoreRoutes`
- `alternateRoutes`

Ignored Routes are any routes that do not use the GET method or have an app config with ignore set to true 
```
  // config/routes.ts
  ...
  '/ignore/me': {
    'GET': {
      handler: 'IgnoreController.me',
      config: {
        app: {
          cms: {
            ignore: true
          }
        }
      }
    }
  }
```
It's important to ignore routes that you don't want Proxy Route to check as it will speed up the application.

Alternate Routes are any routes that use the GET method and have a wildcard or an express parameter in the url eg `/home/*` or `/hello/:world`.
This is useful for when a child route may not have a specific view eg. `/products/1` and the wildcard might eg. `products/:id`.  With this schema, you need not make a view for each product, and instead just define the wildcard templates which the product will inherit.  This does allow you to still have extreme control over any individual page while also having a fallback.

### Add Policies to RouteController Methods
By default spool-proxy-route has no policies to prevent anything from hitting the RouteController endpoints. You will need to create policies with your authentication strategy to determine what is allowed to hit them. We recommend using [Proxy Permissions](https://github.com/calistyle/spool-proxy-permissions) which makes this easy and will lock down administrative endpoints automatically.

### Server Clusters with Flat File (TODO)
For Proxy Router to work on a server cluster as a Flat File server, Redis is required. 
After any route or series is updated as a Flat File, an event is produced to all other servers in the cluster to copy the flat files to their folder structure. This is quick, but expect a few milliseconds of lag.

### Pull Requests to Source (TODO)
If you are hosting your repository on GitHub, then great news, when you create/update/destroy a Page or Series on a production web app, Proxy Router can issue a pull request to your repo. This keeps your remote Flat Files in sync with your production application.
```
TODO example
```

## Usage

### Example series document

This is the default home page located at `/content/series/a0/index.md`

```sh
---
title: Homepage Hello World
keywords: proxy-engine, amazing
runs: 0
score: 0.0
demographics: 
 - {name: 'unknown'}
scripts:
 - /i/can/do/arrays/too.js
 - /path/to/special/page/script.js
og: {'image': '/and/cool/things/like/og-tags.jpg'}
---
<header-component>
</header-component>
# Homepage Hello World
<h2>I can use Normal HTML</h2>

I can even use embeds like a youtube video or my own custom ones.
@[youtube](lJIrF4YjHfQ)

I can even use custom HTML DOM like ones from Angular

<login>
</login>
<footer-component [wow]="amazing">
</footer-component>
```

*** Note: Html components must end on a newline or else they are wrapped by a paragraph tag. 
This is part of Common Mark Spec.

#### Demographics
Demographics is a generic term because they can literally be anything. For example Let's say we have a site that's homepage needs some simple A/B testing.  We have no information about our user, so we can classify them as "Unknown" which is the default demographic. Now, we can set up two series: a0 and b0 and split visits equally with a weight of 50. When our user visits the home page, Proxy Router will send them a0 or b0 and track the view that was run. Now the user does something on the home page which should issue a Positive or Negative control.  

#### Scores and Positive/Negative Controls
When a user does something we don't like on the page, we want to send a negative control back to Proxy Router. For example, if they leave the website, then we might send a negative control. That said, if the user was visiting the a0 series of the homepage, then a0 would get a reduction in it's overall score. If the user does something that we like on the page, for example clicks "Buy Now", then we might want to send a positive control that increases the score of a0. We continue this process until the Baseline and Threshold is met.
   
#### Baseline and Threshold
Every Page has a baseline. The baseline is the minimal times the page can be viewed before the threshold comes into effect.  Imagine it as a survey, where you want 1000 people to take the survey before you review the results. From the previous example between a0 and b0, let's say a 1000 people visit the home page. After that 1000 people have visited, we should have some decent scores from a0 and b0 for example a0 scored 0.89 and b0 score 0.70. Proxy Route now examines the threshold and will predict that a0 is more productive then b0. If we set the threshold to .90, then we will stop testing between a0 and b0 when a0 reaches 0.90 and begin serving only a0 for the "unknown" demographic. 

#### Scoring
A max series score is 1.0 and a min series score is 0.0.  This score is the result of positive/negative scores from some machine learning (nothing too fancy) and user interactions. When a user clicks on let's say a button, we can issue a click event with a score between 1 and 100 based on how important that is too us. For example, a page link maybe get a issue a score of 1, while a "Buy Now" may issue a score of 100. Proxy-engine will take that event score and compare it to the previous score, runs of the series, the threshold of the page, and the weight of series distribution.  

TODO
Truncate tests that are failing a standard deviation from the mean after the baseline is met. 

### Markdown-it (required)
[Markdown-it](https://www.npmjs.com/package/markdown-it) 
is used to parse the document from markdown/html to html.

### Markdown-it Meta Plugin (Default)
Is used to give the flat file readable meta data as well as give the displayed page meta data.

### Markdown-it Component Plugin (Default)
Is used to give the flat files the ability to use html components typical of angular, angular2 and react

### Markdown-it Block Embed (optional)
[Markdown-it Block Embed Embed](https://github.com/rotorz/markdown-it-block-embed) 
is used to grant the parsed document embed-ables.  This could be youtube, vimeo, your own short codes, whatever!

### Controllers
#### RouteController
##### RouteController.view
An example of using `req.proxyroute`.  RouteController.view can return a view as html or as JSON.

##### RouteController.buildToDB
Builds the Flat File structure to the database 

##### RouteController.buildToFL
Builds the Database to a Flat File Structure

##### RouteController.addPage
Adds a Route Model (Page)

##### RouteController.editPage
Edits a Route Model (Page)

##### RouteController.removePage
Removes a Route Model (Page)

##### RouteController.addSeries
Adds a RouteDocument Model (Document)

##### RouteController.editSeries
Edits a RouteDocument Model (Document)

##### RouteController.removeSeries
Removes a RouteDocument Model (Document)

##### RouteController.control
Adds a Positive or Negative value for a series

### Services
#### Flat Files
##### RouterFlService.get(req)
Gets a rendered page from a flatfile given the express request object
@returns
```js
{ 
  id: String, // The id of the Route Model (in this case the ID is null since it's a flat file)
  path: String, // The original request path
  series: String, // The Series Test of the Route Document Model
  version: String, // The Test Version of the Route Document Model
  meta: Object, // The Meta Data from the Route Document Model
  document: String  // The Rendered HTML of the Route Doucment Model
}
```

##### RouterFLService.renderPage()
Resolves and Renders a Route Document

#### Database Files
##### RouterDBService.get(req)
Gets a rendered page from the database given the express request object

@returns
```js
{ 
  id: String, // The id of the Route Model
  path: String, // The original request path
  series: String, // The Series Test of the Route Document Model
  version: String, // The Test Version of the Route Document Model
  meta: Object, // The Meta Data from the Route Document Model
  document: String  // The Rendered HTML of the Route Doucment Model
}
```

#### Controls
##### RouteControlsService.addRun()
Adds a run score to a series

##### RouteControlsService.positive()
Adds a positive score to a series

##### RouteControlsService.negative()
Adds a negative score to a series

#### General
##### RouteService.addPage()
Adds a Page (Route Model).
Calls `RouteService.createPage()`

##### RouteService.createPage()
Adds a Page (Route Model)

##### RouteService.editPage()
Edits a Page (Route Model).
Calls `RouteService.updatePage()`

##### RouteService.updatePage()
Updates a Page (Route Model)

##### RouteService.removePage()
Removes a Page (Route Model).
Calls `RouteService.destroyPage()`

##### RouteService.destroyPage()
Removes a Page (Route Model)

##### RouteService.addSeries()
Adds a Document (RouteDocument Model).
Calls `RouterService.createSeries()`

##### RouteService.createSeries()
Creates a Document (RouteDocument Model)

##### RouteService.editSeries()
Edits a Document (RouteDocument Model).
Calls `RouteService.updateSeries()`

##### RouteService.updateSeries()
Updates a Document (RouteDocument Model)

##### RouteService.removeSeries()
Removes a Document (RouteDocument Model).
Calls `RouteService.destroySeries()`

##### RouteService.destroySeries()
Destroys a Document (RouteDocument Model)

#### Render
##### RenderGenericService.render()
RenderGenericService is a Proxy-Generics service. This module has a default render if none is specified.

Renders a markdown document using Markdown-it and all the plugins configured in proxyGeneric.render_service

@returns
```js
{ 
  meta: <{Object}>, // The Meta Data from the Document
  document: <{String}>  // The Rendered HTML of the Document
}
```

# ROAD MAP
## 1.0.0
- Abstract Render as proxy generic - completed
- Allow folders to not use a series folder
- Build to DB
- Build to FL
- Ignore Staic Assests
- Support Cacheing and Cache Busting
- Support Server Clusters for CMS functions

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-cms.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-cms
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-cms/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-cms/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-cms.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-cms
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-cms.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-cms/coverage


[ci-sequelize-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-sequelize/master.svg
[ci-sequelize-url]: https://circleci.com/gh/fabrix-app/spool-sequelize/tree/master

[ci-express-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-express/master.svg
[ci-express-url]: https://circleci.com/gh/fabrix-app/spool-express/tree/master
