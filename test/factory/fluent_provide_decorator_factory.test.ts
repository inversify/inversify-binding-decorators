/// <reference path="../../src/interfaces/interfaces.d.ts" />

import makeFluentProvideDecorator from "../../src/factory/fluent_provide_decorator_factory";
import fluentProvide from "../../src/decorator/fluent_provide";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("makeFluentProvideDecorator", () => {

    let kernel = new Kernel();

    it("Should return a fluentProvide decorator", () => {

        let fluentProvide2 = makeFluentProvideDecorator(kernel);
        expect((<any>fluentProvide2).name).eql((<any>fluentProvide(kernel)).name);

    });

});
