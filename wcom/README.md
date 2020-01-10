# Foundation For React Based Project
- Node
- Express
- React
- Grunt
- Sass

## Lib

The lib is for common components and modules that can be used throughout a project

### Modules
Custom modules that are referenced by the `package.json` so that they can referenced universally throughout the project.
All module are self invoking functions that return only the necessary and usuable functions. No supporting functions will be returned and will be
contained to the scope of the self invoking function.

**Each module needs a package.json**

### Components
React components.

## Grunt
Tasks:
- Browserify for react components.
- Sass for sass files.
- Watch to watch `.jsx` and `.sass` files.

## Sass
Directory for sass files. Watched by Grunt and compiled into `public/css`

- `_global.scss` is global classes such as `.left`, `.right` and `.clear`
- `_fonts.scss` imported into `_theme.scss`

## API
Project API for web and mobile apps. Built with Express

## Web
The project's web app. Renders views via routes. If the content in a route is dynamic, the web app will make an HTTP request to the API app. Components on the front end can get their data from API via HTTP requests.
