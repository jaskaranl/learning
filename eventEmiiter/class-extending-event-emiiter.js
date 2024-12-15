import { EventEmitter } from 'events'
import { readFile } from 'fs'

class FindRegex extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.files = []
    }

    addFile(file){
      this.files.push( file);
      return this;
    }

    find(){
        for(const file of this.files){
            readFile(file, 'utf8', (err, data) => {
                if(err){
                    return this.emit('errr',err);
                }

                this.emit('fileread',fileread);
                const match = content.match(this.regex)
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }
            })
        }
        return this
    }
}


const findRegexInstance = new FindRegex(/hello \w+/)
findRegexInstance
    .addFile('fileA.txt')
    .addFile('fileB.json')
    .find()
    .on('found', (file, match) => console.log(`Matched "${match}" in file
${file}`))
    .on('error', err => console.error(`Error emitted ${err.message}`))