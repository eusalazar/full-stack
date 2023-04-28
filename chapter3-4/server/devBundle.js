import config from './../config/config';       //when we run the server, the Express app should also load the Webpack middleware that's relevant to the frontend with respect to the configuration
import webpack from 'webpack';                  //that's been set for the client-side code, so that the frontend and backend development workflow is integrated. 
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack.config.client';

const compile = (app) => {
    if(config.env === 'development'){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

export default {
    compile 
}