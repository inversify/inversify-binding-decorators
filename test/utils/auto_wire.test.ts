import { Container } from "inversify";
import { expect } from "chai";
import autoProvide from "../../src/utils/auto_wire";
import "reflect-metadata";

import * as entites from "../stubs/entities";

describe("autoProvide", () => {

    it("Should be able to auto-wire binding declarations", () => {

        let container = new Container();
        // Note @inject annotations are required autoProvide
        // even when using classes are used as identifiers
        // See declaration of Warrior for more details
        autoProvide(container, entites);
        let warrior = container.get(entites.Warrior);
        expect(warrior.fight()).eql("Using Katana...");

    });

});
