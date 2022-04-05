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
})
