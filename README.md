# Facade

A client-side, front-end development boilerplate solution.

This version of the project is JavaScript-framework agnostic. Though, it does work off of the CommonJS/Node-style module system.

If you would like to use Angular, take a look at: **[Facade-Angular](https://github.com/theponti/facade-angular)**

## Dependencies
* NodeJS
* NPM
* Bower

## Features

### Build
* Gulp  
  This boilerplate uses the version of `Gulp` in the `node_modules` directory so you will not need to have it installed globally.
* Browserify

### Styles
* **SASS**
* **Prefix-Free**
* **Bootstrap**

### Scripts
* JSHint
* jQuery

### Testing
* Karma  
  This boilerplate uses the version of `Karma` in the `node_modules` directory so you will not need to have it installed globally.
* Jasmine

### Other
* Modernizer
* HTML Minification

## Usage
1. Clone repo
2. Run `npm install && bower install`
3. Run `rm -rf .git && git init`
4. Run `npm run start`
5. Start Coding

## Tasks

### `npm run start`
This task builds the scripts, styles, and html, and it will also begin the development server at port 4000.

### `npm run build`
This task builds the scripts, styles, and html.

### `npm run build-prod`
This task will build the production, minified versions of the scripts and styles.

### `npm test`
This task will begin `Karma`.
