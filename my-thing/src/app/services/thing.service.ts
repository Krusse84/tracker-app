import { Injectable } from "@angular/core";
import { child, getDatabase, onValue, push, ref, set } from "@angular/fire/database";

@Injectable({ providedIn: 'root' })
export class ThingService {

    db = getDatabase();

    addThing(donor: any) {
        const id = push(child(ref(this.db), 'things')).key!;
        return set(ref(this.db, `things/${id}`), donor);
    }

    getThings(callback: (data: any) => void) {

        onValue(ref(this.db, 'things'), (snapshot) => {
            const things = snapshot.val();
            callback(Object.values(things || {}));
        });
    }
}
