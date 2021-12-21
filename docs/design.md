# Design

This is a brief overview of the app's architecture and an explanation of the
design choices made from its inception.

Maintainability is a critical aspect of this application, at it is intended to
be used for many years to come and kept up to date by a diverse team of
developers with a potentially high turnover.

As a result, it has been carefully designed to strike a balance between using
robust, modern technologies and also keeping an architecture that is easy to
understand for newcomers and close to what is taught in some of ETSIT-UPM's
subjects.

## Technology stack

### Backend

The backend runs on [Node.js](https://nodejs.org/) with the
[Express](https://expressjs.com/) web framework. Database interactions are
handled by the [Sequelize](https://sequelize.org/) ORM. Although it is
compatible with multiple backends, the original development team uses the
[PostgreSQL](https://www.postgresql.org/) RDBMS, and we therefore recommend it
for both local development and production.

### Frontend

Views are written in [React](https://reactjs.org/), a very powerful user
interface library that is widely used nowadays. However, unlike in most
mainstream React apps, views are **rendered on the server side**.

This design choice is aligned with the principle of ease of maintainability, as
some developers might not be familiar with having a REST API interacting with
the app's frontend. Using server-side rendering (SSR) and some of the
aforementioned technologies allow keeping a project structure that might be very
familiar to you, especially if you have taken **subjects at ETSIT-UPM like CORE,
IWEB or CDPS** ([sounds familiar?](https://github.com/CORE-UPM/quiz_2020)).

Unlike that project, this app does not use EJS in the views: that is what React
is for. Don't worry if you are not familiar with React; you'll see that there
are plenty of resources online to help you! It is pretty straightforward, and
there are lots of libreries and components provided by the community that will
make your life much easier (that's why we chose it!).

### Tests

The codebase also features some [automated
tests](https://en.wikipedia.org/wiki/Test_automation) that help making sure that
the app works as expected. The tests are built with [Jest](https://jestjs.io/),
which offers a very descriptive way of writing test code.

## Code style

There are two significant aspects that might grab your attention if you have
worked in the past with older JavaScript projects:

- **JSX:** it is an [extension](https://reactjs.org/docs/introducing-jsx.html)
  of "normal" JavaScript, that is expressly designed for React apps. It looks
  like a mix between JS and HTML, which leads to funny stuff like this:

  ```jsx
  render() {
    const name = "Peter";

    return (<h1>Hello, {name}!</h1>)
  }
  ```

  These files are almost exclusively intended for frontend work, and they can
  be recognised by their `.jsx` extension.
- **ECMAScript 2015+:** this project uses modern JavaScript syntax you might not
  be familiar with, because it has been included in newer versions of the
  JavaScript standards.

  This helps having a codebase that looks much cleaner, and overall allows you
  to do more with less lines of code.
    
These two details have some implications on how this project works. Because
Node.js does not support JSX nor some of the latest syntax changes, we use a
**transpiler** called [Babel](https://babeljs.io/). Very simply explained, it
"translates" new JS/JSX code into older one that is fully compatible with
Node.js.

This is a common practise in modern JS projects, and it shouldn't really affect
you as a developer thanks to how the project has been designed. However, keep in
mind that **the project has to be built before you deploy it to production**,
which basically handles all this transpilation process for you.

You don't have to worry about it either during development, as during
development the code is transparently transpiled on the go.