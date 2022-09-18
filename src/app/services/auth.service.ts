import { Injectable } from '@angular/core';
import { 
  Firestore,
  doc, 
  addDoc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  getDocs,
  collection,
  updateDoc
} from '@angular/fire/firestore';

import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Tornillo, User } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new Subject<User>();
  // No necesitamos establecer un valor previo 
  // tornillos$ = new BehaviorSubject<Tornillo[]>([{id: '', nombre: '', precio: 0, formato: '', marca: ''}]);
  tornillos$ = new Subject<Tornillo[]>();
  loading$ = new BehaviorSubject<Boolean>(false);

  constructor(private firebase: Firestore,
    private router: Router) { 
  }
  
  saveWithId(collectionChosen: any, id: string, item: any) {
    setDoc(doc(this.firebase, collectionChosen, id), item)
  }

  save(collectionChosen: string, item: any){
    addDoc(collection(this.firebase, collectionChosen), item).then(docRef => {
      console.log(docRef.id);
    })
    .catch(error => {
        console.log(error);
    })
  }

  getAll(collectionChosen: string) {
    let rows: Tornillo[] = [];
    getDocs(collection(this.firebase, collectionChosen))
    .then((data:any) => {
      data.docs.map((elem:any) => {
        rows.push({...elem.data(), id: elem.id})
      })
      this.tornillos$.next(rows);
      
    // En caso de que tengamos más de un modelo
    //   switch(collectionChosen) {
    //     case constants.END_POINTS.TORNILLOS:
    //         this.tornillos$.next(rows);
    //         break;
    //     default:
    //       break;
    //   }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }
  
  get(collectionChosen: string, id: string) {
    getDoc(doc(this.firebase, collectionChosen, id))
    .then((data:any) => {
        // TODO: return observable
    })
  }

  update(collectionChosen: string, id:string, data:any) {
    updateDoc(doc(this.firebase, collectionChosen, id), data)
  }

  delete(collectionChosen: string, id: string) {
    // return this.firebase.collection(collection).doc(id).delete();
    deleteDoc(doc(this.firebase, collectionChosen, id));
  }
  

  login(collection: string, usuario: string, password: string) {
    this.loading$.next(true);
    getDoc(doc(this.firebase, collection, usuario))
    .then((data:any) => {
      if(data.data()) {
        this.currentUser$.next(data.data());
        this.router.navigate(['home']);
        this.loading$.next(false);

      } else {
        console.log('NO login')
        this.loading$.next(false);
      }
    })
    .catch((err:any) => {
      console.log(err)
    })
  }
}
