import { Injectable } from "@angular/core";
import { child, getDatabase, onValue, push, ref, set } from "@angular/fire/database";

@Injectable({ providedIn: 'root' })
export class ThingService {

    db = getDatabase();

    addThing(donor: any) {
        const id = push(child(ref(this.db), 'things')).key!;
        return set(ref(this.db, `boats/${id}`), donor);
    }

    getThings(callback: (data: any) => void) {
        onValue(ref(this.db, 'boats'), (snapshot) => {
            const donors = snapshot.val();
            callback(Object.values(donors || {}));
        });
    }
}
