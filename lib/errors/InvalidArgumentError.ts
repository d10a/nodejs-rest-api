export default class InvalidArgumentError {
    constructor(message: string) {
        this.message = message;
        this.name = 'InvalidArgument';
    }

    message: string;

    name: string;

    toString(): string {
        return `${this.name}: ${this.message}`;
    }

}