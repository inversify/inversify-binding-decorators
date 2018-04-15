import ProvideWhenSyntax from "../../src/syntax/provide_when_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { METADATA_KEY } from "../../src/constants";
import { interfaces as inversifyInterfaces } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import interfaces from "../../src/interfaces/interfaces";

describe("ProvideWhenSyntax", () => {
    let NinjaClass: any;
    class Game { }
    let mockBind: sinon.SinonExpectation;

    let mockWhenSyntax: sinon.SinonStubbedInstance<ProvideWhenSyntax<any>>;
    let bindingWhenSyntaxFunction: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingWhenSyntax<any>;
    let provideDoneSyntax: ProvideDoneSyntax;
    let provideWhenSyntax: ProvideWhenSyntax<any>;

    let sandbox: sinon.SinonSandbox;

    function resolveBinding(): interfaces.ProvideSyntax {
        const metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0] as interfaces.ProvideSyntax;
        metadata.constraint(mockBind, null);

        return metadata;

    }
    beforeEach(() => {
        NinjaClass = class Ninja { };
        Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
        sandbox = sinon.createSandbox();

        mockBind = sinon.expectation.create("bind");
        mockWhenSyntax = sandbox.createStubInstance(ProvideWhenSyntax);
        bindingWhenSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => {
                bind("Ninja");
                return mockWhenSyntax as any as inversifyInterfaces.BindingWhenSyntax<any>;
            };
        provideDoneSyntax = new ProvideDoneSyntax(bindingWhenSyntaxFunction);
        provideWhenSyntax = new ProvideWhenSyntax(bindingWhenSyntaxFunction, provideDoneSyntax);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Should be able to declare a binding with contextual constraints", () => {


        it("when", () => {

            provideWhenSyntax.when((request: inversifyInterfaces.Request) => { return true; }).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.when.callCount).eql(1);
            expect(mockBind.callCount).eq(1);
        });

        it("done", () => {
            const doneSpy = sandbox.spy(provideDoneSyntax, "done");
            provideWhenSyntax.done()(NinjaClass);
            resolveBinding();
            expect(doneSpy.callCount).eq(1, "done not called");
            expect(mockBind.callCount).eq(1);
        });

        it("whenTargetNamed", () => {

            provideWhenSyntax.whenTargetNamed("throwable").done()(NinjaClass);
            resolveBinding();

            expect(mockWhenSyntax.whenTargetNamed.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenTargetNamed", () => {

            provideWhenSyntax.whenTargetTagged("throwable", true).done()(NinjaClass);
            resolveBinding();

            expect(mockWhenSyntax.whenTargetTagged.callCount).eq(1);
        });

        it("whenInjectedInto", () => {

            provideWhenSyntax.whenInjectedInto(Game).done()(NinjaClass);
            resolveBinding();

            expect(mockWhenSyntax.whenInjectedInto.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenParentNamed", () => {

            provideWhenSyntax.whenParentNamed("throwable").done()(NinjaClass);
            resolveBinding();

            expect(mockWhenSyntax.whenParentNamed.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenParentTagged", () => {

            provideWhenSyntax.whenParentTagged("throwable", true).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenParentTagged.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenAnyAncestorIs", () => {

            provideWhenSyntax.whenAnyAncestorIs(Game).done()(NinjaClass);
            resolveBinding();

            expect(mockWhenSyntax.whenAnyAncestorIs.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenNoAncestorIs", () => {

            provideWhenSyntax.whenNoAncestorIs(Game).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenNoAncestorIs.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenAnyAncestorNamed", () => {

            provideWhenSyntax.whenAnyAncestorNamed("throwable").done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenAnyAncestorNamed.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenAnyAncestorTagged", () => {

            provideWhenSyntax.whenAnyAncestorTagged("throwable", false).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenAnyAncestorTagged.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenNoAncestorNamed", () => {

            provideWhenSyntax.whenNoAncestorNamed("throwable").done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenNoAncestorNamed.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenNoAncestorTagged", () => {

            provideWhenSyntax.whenNoAncestorTagged("throwable", false).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenNoAncestorTagged.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenAnyAncestorMatches", () => {

            provideWhenSyntax.whenAnyAncestorMatches((request: inversifyInterfaces.Request) => { return true; }).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenAnyAncestorMatches.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });

        it("whenNoAncestorMatches", () => {

            provideWhenSyntax.whenNoAncestorMatches((request: inversifyInterfaces.Request) => { return true; }).done()(NinjaClass);
            resolveBinding();
            expect(mockWhenSyntax.whenNoAncestorMatches.callCount).eq(1);
            expect(mockBind.callCount).eq(1);
        });
    });

});
