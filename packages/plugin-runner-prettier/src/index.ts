import {
    defineOptionsFromJSONSchema,
    defineRunner,
    File,
} from '@garment/runner';
import * as prettier from 'prettier';
import * as options from './schema.json';

interface PrettierRunnerOptions {
    /**
     * The config file to load Prettier's configuration from.
     * @format path
     */
    configFile?: string;

    /**
     * Fix automatically linting errors.
     */
    fix?: boolean;
}

const runnerOptions = defineOptionsFromJSONSchema<PrettierRunnerOptions>(
    options
);

export default defineRunner(runnerOptions, async (ctx) => {
    const { logger } = ctx;
    const { configFile = '', outputDir, fix: fixFlag } = ctx.options;
    logger.warn('outputDir', outputDir);
    logger.warn('fixFlag', fixFlag);
    logger.warn('Boolean(outputDir)', Boolean(outputDir));

    const fix = Boolean(outputDir) && fixFlag;

    logger.warn(`Linting files with Prettier`);
    ctx.input(async (files) => {
        const fixes: File[] = [];

        logger.warn(`files`, files);

        logger.warn(`configFile`, configFile);

        const prettierConfig = await prettier.resolveConfig(configFile);

        files.forEach((file) => {
            logger.warn(`file.data`, file.data);

            //TODO What to do about
            // error SyntaxError: Unexpected token, expected ";" (2:11)
            const isPrettified = prettier.check(file.data.toString('utf8'), {
                ...prettierConfig,
                filepath: file.absolutePath,
            });
            logger.warn(`isPrettified`, isPrettified);
            logger.warn(`file.path`, file.path);

            logger.warn(`fix`, fix);
            if (!isPrettified && fix) {
                logger.warn(`output`, file.data.toString('utf8'));
                const output = prettier.format(file.data.toString('utf8'), {
                    ...prettierConfig,
                    filepath: file.absolutePath,
                });
                logger.warn(`output`, output);

                fixes.push(ctx.file.text(file.path, output));
            }
        });

        return fixes;
    });
});
