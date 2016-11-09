# Bare Router

A minimal unopinionated router.  Matches a pathname against a map of routes, and returns the handler and params.

## Install

```
npm install bare-router
```

## Example using React
``` js
import ReactDOM from 'react-dom';
import Router from './bare-router';

const router = Router({
	'/': (params, props)=> <Home {...props}/>,
	'/user/:id': (params, props) => <User id={params.id} {...props}/>,
	'*': (params, props) => <Error404 {...props}/>
})

const props = {
	pathname: window.location.pathname
};

const { handler, params } = router(props.pathname);

ReactDOM.render(handler(params, props), document.body);
```

## Credits

This work is based off of the [enroute](https://github.com/lapwinglabs/enroute) package by Matthew Mueller. The main difference is that enroute invokes the route handler with the route params, while this router returns the handler and params. This gives flexibility over when the handler is called, and it's arguments.

## License

MIT