import { Container } from "inversify";
import { expect } from "chai";
import autoProvide from "../../src/utils/auto_wire";
import { METADATA_KEY } from "../../src/constants";

import "reflect-metadata";

import * as entites from "../stubs/entities";
import buildProviderModule from "../../src/factory/module_factory";

describe("autoProvide", () => {

    beforeEach(() => {
        Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
    });
    it("Should be able to auto-wire binding declarations", () => {

        let container = new Container();
        // Note @inject annotations are required autoProvide
        // even when using classes are used as identifiers
        // See declaration of Warrior for more details
        autoProvide(container, entites);
        container.load(buildProviderModule());
        let warrior = container.get(entites.Warrior);
        expect(warrior.fight()).eql("Using Katana...");

    });

});
