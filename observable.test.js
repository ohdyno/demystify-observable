class Observable {
    provider;

    constructor(provider = (subscribe) => subscribe(1)) {
        this.provider = provider;
    }

    subscribe(handler) {
        this.provider(handler)
    }
}

describe('observable', () => {
    it('can be created to always give subscribers the number 1 once', (done) => {
        new Observable().subscribe(n => {
            expect(n).toEqual(1);
            done();
        })
    })

    it('can be created with a provider function', (done) => {
        function provider(subscriber) {
            subscriber(12);
        }

        new Observable(provider).subscribe(n => {
            expect(n).toEqual(12);
            done();
        })
    })
})
