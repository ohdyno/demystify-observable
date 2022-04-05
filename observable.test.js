class Observable {
    subscribe(handler) {
        handler(1)
    }
}

describe('observable', () => {
    it('can be created to always give subscribers the number 1 once', (done) => {
        new Observable().subscribe(n => {
            expect(n).toEqual(1);
            done();
        })
    })
})
