/// <reference path="../../src/interfaces/interfaces.d.ts" />

import makeProvideDecorator from "../../src/factory/provide_decorator_factory";
import provide from "../../src/decorator/provide";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("makeFluentProvideDecorator", () => {

    let kernel = new Kernel();

    it("Should return a fluentProvide decorator", () => {

        let provide2 = makeProvideDecorator(kernel);
        expect((<any>provide2).name).eql((<any>provide(kernel)).name);

    });

});
