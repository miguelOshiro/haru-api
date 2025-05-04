import { Injectable } from '@nestjs/common';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import axios from 'axios';

import { storage } from '../../firebase/firebase-config';

@Injectable()
export class StorageService {

    constructor(

    )
    {}


    // async uploadFile(file: Express.Multer.File, fullPath: string,fileName: string): Promise<string> {

    //     const ext = file.mimetype.split('/')[1];
    //     const keyName = `${fullPath}/${fileName}.${ext}`;
        
    //     const storageRef = ref(storage, keyName);
    //     await uploadBytes(storageRef, file.buffer);
    //     const downloadUrl = await getDownloadURL(storageRef);
        
    //     return downloadUrl;
    
    // }
    
    
      async deleteFile(keyName: string): Promise<void> {
        const fileRef = ref(storage, keyName);
        await deleteObject(fileRef);
      }


      async getFile(fullPath: string, fileName: string): Promise<string> {

        const keyName = `${fullPath}/${fileName}`;
        const storageRef = ref(storage, keyName);
        const downloadUrl = await getDownloadURL(storageRef);
        
        const response = await axios.get(downloadUrl);

        const content =  response.data;
        return content
      }


}
