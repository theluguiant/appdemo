/* tslint:disable */
export class User {
    constructor(
        public id: number,
        public name: string,
        public username: string,
        public email: string,
        public isadmin: number,
        public address: object,
        public phone: string,
        public company: object
    ) {}
}