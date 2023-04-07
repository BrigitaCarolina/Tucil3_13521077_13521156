import fs from 'fs';
import path from 'path';

    // const cwd = process.cwd();
    // const parent = path.dirname(cwd);
    // const filePath = path.join(parent, 'test', file + '.txt');
    // console.log(filePath);

export function readCoordinate() {
    fs.readFile('test1.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    });
}

readCoordinate();