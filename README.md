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

### Animated SVGs andd interactve elements

Animated elements show user how to interact with the page. Some remain hidden until needed.

!["Pull-down Icon"](https://github.com/mendahu/tweeter/blob/master/docs/animated_svg.gif?raw=true)
!["Jump button"](https://github.com/mendahu/tweeter/blob/master/docs/jump-button.gif?raw=true)

Tweet elements have box-shadow effect on hover, and interactive buttons show coloured hover effects.

!["Tweet"](https://github.com/mendahu/tweeter/blob/master/docs/animations.gif?raw=true)

### Drop-down Element

New tweet box is hidden by default to add focus to tweet content and is accessible with a quick button click.

!["Tweet"](https://github.com/mendahu/tweeter/blob/master/docs/drop-down.gif?raw=true)

### Asynchronous Interaction

Tweet asynchronously submit and load in to feed using AJAX.

!["Asynchronous interaction"](https://github.com/mendahu/tweeter/blob/master/docs/tweet.gif?raw=true)

### Error handling

Dynamic counter tracks user input and turned red to warn user they have exceed tweet limit. Submission attempts are marked by an inpage error screen which disappears after a timeout.

Textarea automatically expands with text.

!["Character counter"](https://github.com/mendahu/tweeter/blob/master/docs/over-tweet.gif?raw=true)
!["Error messages"](https://github.com/mendahu/tweeter/blob/master/docs/error.gif?raw=true)