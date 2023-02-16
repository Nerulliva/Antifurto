import {Injectable} from "@angular/core";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {File} from '@awesome-cordova-plugins/file/ngx';
import {error} from "@angular/compiler-cli/src/transformers/util";
import write_blob, {BlobWriteOptions} from "capacitor-blob-writer";

const DOCUMENTS_DIR = Directory.Documents;
const DATA_DIR = Directory.Data;
const MAIN_FOLDER_NAME = 'Antifurto';
const MAIN_FOLDER_PATH = 'file:///data/user/0/io.ionic.starter/files/';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService{
  constructor(private fileCtrl: File) {
  }

  async writeFile(text: any, name?: string): Promise<string>{
    let file = new Blob([text], {type: 'text/plain'});
    return this.writeFileOnDevice(file,name);
  }

  writeFileOnDevice(file: any, name? : string): Promise<string> {
    // let path = '/' + MAIN_FOLDER_PATH + MAIN_FOLDER_NAME + '/' +name; // path del file // sembra che va
    let path = '/'  + MAIN_FOLDER_NAME + '/' +name; // path del file
    console.log('controllo path:' + path);
    // creazione
    return Filesystem.mkdir({
      directory: DATA_DIR,
      path: `${MAIN_FOLDER_NAME}`
    })
      .then( async () => {
        // se la creazione della cartella va a buon fine, scrive file
        return await this.write(file, path, DATA_DIR);
        console.log('dir creata e file scritto')
      })
      .catch(async () => {
        // se creazione non va, la cartella esiste gia e puo' sovrascrivere il file
        return await this.write(file, path, DATA_DIR);
        console.log('dir non creata ma file scritto')
      })
  }

  async write(file:Blob, path:string, directory?:Directory ){
    let blobWriterOptions: BlobWriteOptions = {
      path: path,
      blob: file,
      on_fallback(error: any) {
        console.error('error: ', error);
      }
    }
    if(directory){
      //Solo se scrivo su device e indirizza alla cartella da puntare per il salvataggio.
      blobWriterOptions.directory = directory
    };
    return  await write_blob(blobWriterOptions)
  }

  // PER CARTELLA DATA
  //scrivo la cartella Antifurto se non presente
  writeDir(){
    this.checkFolder().then(async (res) => {
      console.log(`res ${res}`);
      await Filesystem.mkdir({
        directory: DATA_DIR,
        path: `/${MAIN_FOLDER_NAME}`
      });
      console.log('cartella creata');
    })
  }
  // leggo il contenuto della dir DATA
  readDirData(){
    Filesystem.readdir({
      directory: DATA_DIR,
      path:''
    }).then( res => {
      console.log(res.files.length);
      for (const x of res.files){
        console.log(x.uri);
        console.log(x.name);
      }
    })
  }

// verifico la presenza della cartella Antifurto
  async checkFolder(): Promise<boolean>{
    return this.fileCtrl.checkDir(MAIN_FOLDER_PATH,MAIN_FOLDER_NAME).then((res)=>{
      console.log(`res ckfolder ${res}`);
      console.log(`Directory ${MAIN_FOLDER_NAME} exists`)
      return true;
    }).catch(err =>{
      console.log(`Directory ${MAIN_FOLDER_NAME} not exists`);
      return false;
    })
  }


  readAppFiles(){
    Filesystem.readdir({
      directory: DATA_DIR,
      path: MAIN_FOLDER_NAME
    }).then( res => {
      console.log(`lunghezza files in Documents ${res.files.length}`);
      for (const x of res.files){
        console.log(x.uri);
        console.log(x.name);
      }
    })
  }
}
