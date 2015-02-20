define([
    'modules/bootstrap',
    'test/utils/mockjax',
    'sinon'
], function (
    Bootstrap,
    mockjax,
    sinon
) {
    describe('Bootstrap', function () {
        var ajax;

        beforeEach(function () {
            jasmine.clock().install();
            ajax = mockjax();
        });
        afterEach(function () {
            jasmine.clock().install();
            ajax.dispose();
        });

        it('loads all endpoints correctly', function () {
            ajax({
                url: '/config',
                responseText: {
                    fronts: ['uk'],
                    collections: ['one', 'two']
                }
            }, {
                url: '/switches',
                responseText: {
                    'switch-one': false
                }
            });

            var bootstrap = new Bootstrap(),
                success = sinon.spy(),
                fail = sinon.spy();

            bootstrap
                .get()
                .onload(success)
                .onfail(fail);

            jasmine.clock().tick(100);

            expect(fail.called).toBe(false);
            expect(success.called).toBe(false);
            expect(success.calls[0][0]).toEqual({
                config: {
                    fronts: ['uk'],
                    collections: ['one', 'two']
                },
                switches: {
                    'switch-one': false
                }
            });
        });

        it('fails validation', function () {
            ajax({
                url: '/config',
                responseText: {
                    banana: 'yellow'
                }
            }, {
                url: '/switches',
                responseText: {
                    'switch-one': false
                }
            });

            var bootstrap = new Bootstrap(),
                success = sinon.spy(),
                fail = sinon.spy();

            bootstrap
                .get()
                .onload(success)
                .onfail(fail);

            jasmine.clock().tick(100);

            expect(fail.called).toBe(true);
            expect(fail.calls[0][0]).toMatch(/config is invalid/);
            expect(success.called).toBe(false);
        });

        it('fails on network error', function () {
            ajax({
                url: '/config',
                responseText: {
                    fronts: ['uk'],
                    collections: ['one', 'two']
                }
            }, {
                url: '/switches',
                status: 404
            });

            var bootstrap = new Bootstrap(),
                success = sinon.spy(),
                fail = sinon.spy();

            bootstrap
                .get()
                .onload(success)
                .onfail(fail);

            jasmine.clock().tick(100);

            expect(fail.called).toBe(true);
            expect(fail.calls[0][0]).toMatch(/switches are invalid/);
            expect(success.called).toBe(false);
        });
    });
});
