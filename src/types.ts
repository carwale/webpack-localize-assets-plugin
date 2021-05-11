import type WP4 from 'webpack';
import type WP5 from 'webpack5';
import * as z from 'zod';
import hasOwnProp from 'has-own-prop';

const LocaleSchema = z.record(z.string());
const LocalesSchema = z.record(LocaleSchema).refine(
	object => Object.keys(object).length > 0,
	{
		message: 'locales must contain at least one locale',
	},
);

export const OptionsSchema = z.object({
	locales: LocalesSchema,
	functionName: z.string().optional(),
	throwOnMissing: z.boolean().optional(),
	sourceMapsForLocales: z.string().array().optional(),
}).refine(options => (
	!options.sourceMapsForLocales
	|| options.sourceMapsForLocales.every(locale => hasOwnProp(options.locales, locale))
), {
	message: 'sourceMapsForLocales must contain valid locales',
});

export type Options = z.infer<typeof OptionsSchema>;

export { WP4, WP5 };
export type Webpack = typeof WP4 | typeof WP5;
export type Plugin = WP4.Plugin;
export type Compiler = WP4.Compiler | WP5.Compiler;
export type Compilation = WP5.Compilation | WP4.compilation.Compilation;
export type NormalModuleFactory = Parameters<WP5.Compiler['newCompilation']>[0]['normalModuleFactory'];