export default class BasRequestError {
    constructor(message: string) {
        this.message = message;
        this.name = 'BadRequest';
    }

    message: string;

    name: string;

    toString(): string {
        return `${this.name}: ${this.message}`;
    }

}