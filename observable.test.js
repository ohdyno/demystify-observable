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
    it('can be created to always give subscribers the number 1 once', () => {
        expect.assertions(1)

        new Observable().subscribe(n => {
            expect(n).toEqual(1);
        })
    })

    it('can be created with a provider function', () => {
        expect.assertions(1)

        function provider(subscriber) {
            subscriber(12);
        }

        new Observable(provider).subscribe(n => {
            expect(n).toEqual(12);
        })
    })

    it('can be created with an async provider function', (done) => {
        expect.assertions(1)

        function provider(subscriber) {
            setTimeout(() => subscriber(12), 100);
        }

        new Observable(provider).subscribe(n => {
            expect(n).toEqual(12);
            done()
        })
    })
})
