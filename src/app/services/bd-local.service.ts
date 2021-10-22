import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { IAgenda } from '../interfaces/iagenda';

@Injectable({
  providedIn: 'root'
})
export class BdLocalService {

  agenda: IAgenda[]=[];

  private _storage: Storage | null = null;

  constructor(private storage: Storage, public toastController: ToastController) {
    this.init();
    //Cargo el contenido de el localStorage en agenda
    this.cargarContactos();
    
  }
  guardarContacto(strNombre:string, nro:string){
    //Verifico si el contacto nuevo estaba anteriormente en la bd o no
    const existe= this.agenda.find(c=>c.strNumero===nro);
    if (!existe) {
      this.agenda.unshift({strNombre:strNombre,strNumero:nro})
      this._storage.set('agenda',this.agenda)
      this.presentToast("contacto agregado")
    } else {
      this.presentToast("contacto ya existe")

    }
  }





  async cargarContactos() {
    const miAgenda=await this.storage.get('agenda');
    if (miAgenda) {
        this.agenda=miAgenda;
    }
  }



  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast(mensaje:string) {

    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position: 'top',
      duration: 2000
    });
    toast.present();

  }
}