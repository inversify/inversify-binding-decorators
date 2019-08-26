import fluentProvide from "../../src/decorator/fluent_provide";
import { expect } from "chai";
import "reflect-metadata";

describe("fluentProvide", () => {

    it("Should return a configurable fluent builder", () => {
        class Ninja { }
        let provided = fluentProvide(Ninja);
        expect(provided).have.property("inSingletonScope");
        expect(provided).have.property("done");
    });

    it("Should return an instance of ProvideInWhenOnSyntax once it is configured", () => {
        let provideInWhenOnSyntax = fluentProvide("SomeTypeID");
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(undefined);
    });

    it("Should throw if @fluentProvide is applied more than once without force flag", () => {

        const provideSingleton = (identifier: any) => {
            return fluentProvide(identifier)
                .inSingletonScope()
                .done();
        };

        function shouldThrow() {
            @provideSingleton("Ninja")
            @provideSingleton("SilentNinja")
            class Ninja { }
            return Ninja;
        }

        expect(shouldThrow).to.throw(
            "Cannot apply @fluentProvide decorator multiple times but is has been used " +
            "multiple times in Ninja " +
            "Please use done(true) if you are trying to declare multiple bindings!"
        );

    });

    it("Should work if @fluentProvide is applied with no arguments", () => {
      function shouldThrow() {
        @fluentProvide().inSingletonScope().done()
        class Ninja {}
        return Ninja;
      }

      expect(shouldThrow).not.to.throw();
    });

});
