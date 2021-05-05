import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfViewerService {
  appExiste: any;
  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private nativeHTTP: HTTP,
    private http: HttpClient
  ) {}

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */

  getPDFtoBlob(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(url, { responseType: 'blob' as 'json' })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  download(url: string, fileName: string) {
    console.log(url);
    try {
      this.getPDFtoBlob(url)
        .then((response) => {
          return this.file.writeFile(
            this.file.cacheDirectory,
            fileName,
            new Blob([response]),
            {
              replace: true,
            }
          );
        })
        .then(() => {
          return this.fileOpener.open(
            this.file.cacheDirectory + '/' + fileName,
            'application/pdf'
          );
        })
        .catch((error) => {
          const err = error;
        });
    } catch (error) {
      const err = error;
    }
  }
}
