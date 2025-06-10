export class InjectPrefix {
    private prefix: string;
    constructor(private p: string) {
        this.prefix = p;
    }

    inject(path: string): string {
        const startWith = path.startsWith('/');
        return `${this.prefix}${startWith ? '' : '/'}${path}`;
    }
}
