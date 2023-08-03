import { defaultDocsB64 } from "./defaultDocsB64";
import { defaultImageB64 } from "./defaultImageB64";
import { defaultTacB64 } from "./defaultTacB64";
import { defaultVideoB64 } from "./defaultVideoB64";

export const defaultsB64: { [key in mediaTypes]: string } = {

    'image': defaultImageB64,
    'video': defaultVideoB64,
    'doc': defaultDocsB64,
    'tac': defaultTacB64

}