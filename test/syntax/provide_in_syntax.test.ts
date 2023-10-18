import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import { interfaces as inversifyInterfaces } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { METADATA_KEY } from "../../src/constants";

describe("ProvideInSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to declare a binding with singleton scope", () => {

        class Ninja { }
        let inSingletonScopeExpectation = sinon.expectation.create("inSingletonScope");
        let mockBindingInSyntax = { inSingletonScope: inSingletonScopeExpectation } as any as inversifyInterfaces.BindingInSyntax<any>;
        let mockBind = sinon.expectation.create("bind");
        let bindingInSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => {
                bind<Ninja>("Ninja");
                return mockBindingInSyntax;
            };
        let binding: inversifyInterfaces.Binding<any> = (<any>bindingInSyntaxFunction)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax(binding as any);

        let provideInSyntax = new ProvideInSyntax(bindingInSyntaxFunction, provideDoneSyntax);

        provideInSyntax.inSingletonScope().done()(Ninja);
        let metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
        metadata.constraint(mockBind);
        expect(inSingletonScopeExpectation.calledOnce).to.eql(true, "inSingletonScope was not called exactly once");
        expect(mockBind.calledWith("Ninja")).to.be.eql(true, "mock bind was not called");

    });
    it("Should be able to declare a binding with transient scope", () => {

        class Ninja { }
        let inTransientScopeExpectation = sinon.expectation.create("inTransientScope");
        let mockBindingInSyntax = { inTransientScope: inTransientScopeExpectation } as any as inversifyInterfaces.BindingInSyntax<any>;
        let mockBind = sinon.expectation.create("bind");
        let bindingInSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => {
                bind<Ninja>("Ninja");
                return mockBindingInSyntax;
            };
        let binding: inversifyInterfaces.Binding<any> = (<any>bindingInSyntaxFunction)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax(binding as any);

        let provideInSyntax = new ProvideInSyntax(bindingInSyntaxFunction, provideDoneSyntax);

        provideInSyntax.inTransientScope().done()(Ninja);
        let metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
        metadata.constraint(mockBind);
        expect(inTransientScopeExpectation.calledOnce).to.eql(true, "inTransientScope was not called exactly once");
        expect(mockBind.calledWith("Ninja")).to.be.eql(true, "mock bind was not called");

    });
    it("Should be able to declare a binding with request scope", () => {

        class Ninja { }
        let inRequestScopeExpectation = sinon.expectation.create("inRequestScope");
        let mockBindingInSyntax = { inRequestScope: inRequestScopeExpectation } as any as inversifyInterfaces.BindingInSyntax<any>;
        let mockBind = sinon.expectation.create("bind");
        let bindingInSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => {
                bind<Ninja>("Ninja");
                return mockBindingInSyntax;
            };
        let binding: inversifyInterfaces.Binding<any> = (<any>bindingInSyntaxFunction)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax(binding as any);

        let provideInSyntax = new ProvideInSyntax(bindingInSyntaxFunction, provideDoneSyntax);

        provideInSyntax.inRequestScope().done()(Ninja);
        let metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
        metadata.constraint(mockBind);
        expect(inRequestScopeExpectation.calledOnce).to.eql(true, "inRequestScope was not called exactly once");
        expect(mockBind.calledWith("Ninja")).to.be.eql(true, "mock bind was not called");

    });
});
