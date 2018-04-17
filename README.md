# gh-explorer

UI to explore an organization's repositories and commits. An exploration into Github's [GraphQL API](https://developer.github.com/v4/).

Built using:

* [yarn](https://yarnpkg.com)
* [create-react-app](https://github.com/facebook/create-react-app)
* [apollo](https://www.apollographql.com)

## Instructions

1.  Clone or download the repo and run `yarn`
2.  Modify `TOKEN` in `index.js` to use your GitHub api key (I keep mine in a `.env.local` file)
3.  Run `yarn start`
4.  Visit `localhost:3000` in your browser

## Browser & Device Requirements

* Modern versions of Chrome, Firefox, and Safari are supported.
* Devices with a minimum width of `1024px` will have the best experience at this time.
