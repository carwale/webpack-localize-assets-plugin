import type { Identifier } from 'estree';
import { LocalizeCompiler, LocalizeCompilerContext } from '../types';
import { stringifyAst } from './stringify-ast';

export function callLocalizeCompiler<LocalizedData>(
	localizeCompiler: LocalizeCompiler<LocalizedData>,
	context: LocalizeCompilerContext<LocalizedData>,
	localeName: string,
) {
	const callNodeArguments = context.callNode.arguments.map(stringifyAst);
	const functionName = (context.callNode.callee as Identifier).name;
	return localizeCompiler[functionName].call(context, callNodeArguments, localeName);
}
