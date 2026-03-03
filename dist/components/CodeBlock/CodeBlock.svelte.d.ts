import { /* Theme, */ type TranslationProps } from '../../types.js';
type Props = {
    code: string;
    lineNumbers?: boolean;
    lightTheme?: string;
    darkTheme?: string;
    copy?: boolean;
    translations?: TranslationProps<'code_copy' | 'code_copied'>;
};
declare const CodeBlock: import("svelte").Component<Props, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
