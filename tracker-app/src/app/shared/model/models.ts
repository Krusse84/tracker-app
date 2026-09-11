export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface Thing {
    uid: string;
    pos: Position;
    updatedDate: number;
    updatedTime: number;
    rssi: string;
    temperature: number;
    humidity: number;
    houseBattery: number;
    speed: number;
    owner: string;
    model: string;
    icon: any;
    thingImage: string;
    avatarImage: string;
    subscriptionId: string;
    course: number;
    errors: number[];
    warnings: number[];
}

export interface Position {
    long: number;
    lat: number;
}