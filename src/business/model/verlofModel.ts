export namespace businessmodel {
    export class Verlof {
        constructor(
            private captainEmail: string,
            private creationDate: Date,
            private startDate: Date,
            private endDate: Date
        ) {}
    }
}
