import fluentProvide from "../../src/decorator/fluent_provide";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("fluentProvide", () => {

    it("Should return a configurable decorator", () => {
        let container = new Container();
        let provide = fluentProvide(container);
        expect(typeof provide).eqls("function");
    });

    it("Should return an instance of ProvideInWhenOnSyntax once it is configured", () => {
        let container = new Container();
        let provide = fluentProvide(container);
        let provideInWhenOnSyntax = provide("SomeTypeID");
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(undefined);
    });

    it("Should throw if @fluentProvide is applied more than once without force flag", () => {

        let container = new Container();
        let provideFluent = fluentProvide(container);

        const provideSingleton = (identifier: any) => {
          return provideFluent(identifier)
            .inSingletonScope()
            .done();
        };

        function shouldThrow() {
            @provideSingleton("Ninja")
            @provideSingleton("SilentNinja")
            class Ninja {}
            return Ninja;
        }

        expect(shouldThrow).to.throw(
            "Cannot apply @provideFluent decorator multiple times but is has been used " +
            "multiple times in Ninja " +
            "Please use @done(true) if you are trying to declare multiple bindings!"
        );

    });

    it("Should work if @provide is applied more than once with force flag", () => {

        let container = new Container();
        let provideFluent = fluentProvide(container);

        const provideSingleton = (identifier: any) => {
            return provideFluent(identifier)
            .inSingletonScope()
            .done(true); // IMPORTANT!
        };

        function shouldThrow() {
            @provideSingleton("Ninja")
            @provideSingleton("SilentNinja")
            class Ninja {}
            return Ninja;
        }

        expect(shouldThrow).not.to.throw();

    });

});
