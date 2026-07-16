import { test as base } from '@playwright/test';
import { RequestHandler } from './request-handler';
import { APILogger } from './logger';
import { setCustomExpectLogger } from './custom_expect';
import { config } from '../api-test.config';
import { createToken } from '../helpers/createToken';


type TestOptions = {
    api: RequestHandler;
    config: typeof config
};

export type WorkerFixter = {

    authToken: string
}

export const test = base.extend<TestOptions, WorkerFixter>({

    authToken: [async ({}, use) => {
        const authToken = await createToken(config.userEmail, config.userPassword);
        await use(authToken);
    }, { scope: 'worker' }],

    api: async ({ request, authToken }, use) => {

        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHandler = new RequestHandler(request, config.userEmail, logger, authToken );
        await use(requestHandler);
    },
    config: async ({}, use) => {
        await use(config);
    }
});

export { expect } from '@playwright/test';