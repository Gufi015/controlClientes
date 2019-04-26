import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../modelo/configuracion.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracionService{

  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;

  id: '1';

  constructor(private db:AngularFirestore){

  }

  getConfiguracion(): Observable<Configuracion>{
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }

  modificarConfiguracion(configuracion: Configuracion){
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionDoc.update(configuracion);

  }
}