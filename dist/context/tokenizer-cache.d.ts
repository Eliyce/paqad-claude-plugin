declare const HEURISTIC_TOKENIZER_VERSION = "heuristic";
interface LoadedTokenizer {
    readonly tokenizer_version: string;
    countTokens(text: string): number;
}
declare function getOrLoad(version: string): Promise<LoadedTokenizer>;
declare function clearTokenizerCache(): void;

export { HEURISTIC_TOKENIZER_VERSION, clearTokenizerCache, getOrLoad };
export type { LoadedTokenizer };
