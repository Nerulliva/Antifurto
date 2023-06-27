import {Injectable} from "@angular/core";
import {Directory, Filesystem, ReaddirResult} from "@capacitor/filesystem";
import {File} from '@awesome-cordova-plugins/file/ngx';
import write_blob, {BlobWriteOptions} from "capacitor-blob-writer";
import {Cliente} from "../model/cliente.interface";

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

  // non viene sovrascritto il file. mkdir restituisce errore
  writeFileOnDevice(file: any, name? : string): Promise<string> {
    let path = '/'  + MAIN_FOLDER_NAME + '/' +name; // path del file
    console.log('controllo path:' + path);
    // creazione
    return Filesystem.mkdir({
      directory: DATA_DIR,
      path: `${MAIN_FOLDER_NAME}`
    })
      .then( async () => {
        // se la creazione della cartella va a buon fine, scrive file
        console.log('dir creata e file scritto')
        return await this.write(file, path, DATA_DIR);
      })
      .catch(async () => {
        // se creazione non va, la cartella esiste gia e puo' sovrascrivere il file
        console.log('dir non creata ma file scritto')
        await this.delete(path, DATA_DIR); // da errore
        return await this.write(file, path, DATA_DIR);
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
    return await write_blob(blobWriterOptions)
  }

  // PER CARTELLA DATA
  //scrivo la cartella Antifurto se non presente
  writeDir(){
    this.checkFolder().then(async (res) => {
      console.log(`res ${res}`);
      if(!res) {
        await Filesystem.mkdir({
          directory: DATA_DIR,
          path: `/${MAIN_FOLDER_NAME}`
        });
        console.log('cartella creata');
      }
    }).catch(error => {
      console.log(error.toString());
    });
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

  printAppFiles(){
    Filesystem.readdir({
      directory: DATA_DIR,
      path: MAIN_FOLDER_NAME
    }).then( res => {
      console.log(`lunghezza files in Antifurto ${res.files.length}`);
      for (const x of res.files){
        console.log(x.uri);
        console.log(x.name);
      }
    })
  }

  ////// PER LETTURA
  getFileReader(): FileReader {
    //file reader inserito per funzionare con Capacitor nella modalità mobile
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }

  b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
    //console.log(b64Data);
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      };
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  readFileContent(file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }
      let blob = this.b64toBlob( file, '');
      const reader = this.getFileReader();
      reader.onload = (e) => {
        //@ts-ignore
        const text = typeof reader.result == 'string' ? reader.result : reader.result.toString();
        resolve(text);
      };
      reader.readAsText(blob);
    });
  }

  async getFiles(): Promise<ReaddirResult>{
    return Filesystem.readdir({
      directory: DATA_DIR,
      path: MAIN_FOLDER_NAME,
    }).then(res => {
      return res;
    });
  }

  async read(): Promise<any>{
    const listFiles = await this.getFiles();

    if(listFiles.files.length > 0) {
      let clienti: Cliente[] = [];
      // for (const file of listFiles.files) {
      //   if (file.type == 'file') {
          //let nome = file.name;
          return Filesystem.readFile({
            directory: DATA_DIR,
            path: MAIN_FOLDER_NAME + '/clienti' //+ nome
          }).then(async file => {
            const fileContent = await this.readFileContent(file.data);
            let cliente = JSON.parse(fileContent);
            clienti = cliente;
            console.log(`clienti in file -> ${clienti.toString()}`);
            //clienti.push(cliente);
            console.log(`content -> ${fileContent}`);
            return clienti;
            // this.clientiService.addCliente(cliente);
          }).catch(err => {
            console.log(`Errore nella lettura del file ` + err);
            return false;
          })
        // }
      // }
    }
  }

  async delete(file_path: any, directory?: any ){
    console.log(`delete file_path: ${file_path}`)
    return await Filesystem.deleteFile({
      directory: directory,
      path: file_path,
    }).then( res => {
      return true
    }).catch(err => {
      console.log(err);
      return false;
    });
  }
  /*async deleteFile(fileType : FileType, name : string) : Promise<boolean>{
    if(this.modeCheckerService.getModSalvataggio() !== 'SD'){
      this.delete(`${this.currentFolder}/${this.getPath(fileType, name)}` ,APP_DIRECTORY);
    }else{
      return this.diagnostic.getExternalSdCardDetails()
        .then( async (value:MemoryDevice[]) => {
          let root = value.find(el => el.type=='root');
          if(root){
            let sd_path = root.filePath;
            let file_path = `${sd_path}/Documents/`+ this.getPath(fileType, name);
            return this.delete(`${file_path}`);
          }else{

            return this.delete(`${this.currentFolder}/${this.getPath(fileType, name)}` ,APP_DIRECTORY);
          }
        });
    }
  }*/


}
