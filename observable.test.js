class Observable {
    provider;

    constructor(provider) {
        if (!provider) {
            throw new Error('provider required')
        }
        this.provider = provider;
    }

    subscribe(handler) {
        this.provider(handler)
    }
}

describe('observable', () => {
    it('throws an error if a provider is not provided at construction', () => {
        expect.assertions(1)

        expect(() => new Observable()).toThrow("provider required")
    });

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

    it('can be created with a provider function that provides multiple values', () => {
        expect.assertions(1)

        function provider(subscriber) {
            subscriber(1);
            subscriber(2);
        }

        const values = [];

        new Observable(provider).subscribe(n => {
            values.push(n)
        })

        expect(values).toEqual([1, 2])
    })
})
