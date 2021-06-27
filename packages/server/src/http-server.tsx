/* eslint-disable testing-library/render-result-naming-convention */
import express from 'express';
import compression from 'compression';
import ReactDOMServer from 'react-dom/server';
import { App } from '@typescript-monorepo/app';
import { StaticRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import * as fs from 'fs';
import * as path from 'path';

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache(),
});

export function createHttpServer(): express.Express {
    const app = express();

    app.use(compression());
    app.use('/dist', express.static(path.resolve('../app/dist/')));

    app.use(ssrHandler);

    return app;
}

function ssrHandler(req: express.Request, res: express.Response) {
    const indexFile = path.resolve('../app/dist/index.html');

    const app = ReactDOMServer.renderToString(
        <ApolloProvider client={client}>
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>{' '}
        </ApolloProvider>
    );

    fs.readFile(indexFile, 'utf8', (err: any, data: any) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root" data-ssr>${app}</div>`
            )
        );
    });
}
