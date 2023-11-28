import fixWebmDuration from 'webm-duration-fix';
import { parseBuffer } from 'music-metadata';
import { inspect } from 'util';
import { readFile } from 'node:fs/promises';
import { Blob } from 'node:buffer';

const mimeType = 'video/webm\;codecs=vp9';

(async () => {
    try {
        const webmBuffer = await readFile('./samples/189741550.webm');
        const webmBlob = new Blob([webmBuffer], { type: mimeType })
        const fixedWebmBlob = await fixWebmDuration.default(webmBlob, {mimeType});
        const metadata = await parseBuffer(await fixedWebmBlob.arrayBuffer());
        console.log(inspect(metadata.common, { showHidden: false, depth: null }));
    } catch (error) {
        console.error(error.message);
    }
})();