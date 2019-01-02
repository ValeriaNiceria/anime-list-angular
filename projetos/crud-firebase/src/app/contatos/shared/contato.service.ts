import { Injectable } from '@angular/core';
import { Contato } from './contato'
import { AngularFireDatabase } from '@angular/fire/database'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

	constructor(
		private db: AngularFireDatabase
	) { }

	public insert(contato: Contato) {
		this.db.list('contato').push(contato)
			.then((result: any) => {
				console.log(result.key)
			})
	}

	public update(contato: Contato, key: string) {
		this.db.list('contato').update(key, contato)
			.catch((error) => {
				console.error('Erro ao atualizar: ', error)
			})
	}

	public getAll() {
		return this.db.list('contato')
			.snapshotChanges()
			.pipe(
				map(changes => {
					return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
				})
			)
	}

	public delete(key: string) {
		this.db.object(`contato/${key}`).remove()
	}
}
