# Tweeter Project

Tweeter is a simple, single-page Twitter clone designed to demonstrate CSS and SASS styling, AJAX requests, form validation, and ux/ui. 

## Dependencies

- Express
- Node 5.10.x or above
- Autosize
- Body Parser
- Chance
- md5

## Getting Started
- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node index.js` command.

*Note:* autosize is included in the package.json and can be installed as a dependency with `npm install`, however this project does not use a javascript compiler. Therefore for demonstration purposes, the autosize.js file was copied from the node_module folder to the public/scripts folder and loaded into the html file to run client-side.

## Features

### Fully Responsive ###

A fully responsive design wth breakpoints at 450px, 768px and 1024px.

Navbar is fixed in desktop view and scrolls with page in mobile view to preserve screen real estate.

!["Fully Responsive Design"](https://github.com/mendahu/tweeter/blob/master/docs/responsive.gif?raw=true)

### 