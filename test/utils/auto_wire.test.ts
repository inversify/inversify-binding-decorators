/// <reference path="../../src/interfaces/interfaces.d.ts" />

import { Kernel } from "inversify";
import { expect } from "chai";
import autoProvide from "../../src/utils/auto_wire";
import "reflect-metadata";

import * as entites from "../stubs/entities";

describe("autoProvide", () => {

    it("Should be able to auto-wire binding declarations", () => {

        let kernel = new Kernel();
        // Note @inject annotations are required autoProvide 
        // even when using classes are used as identifiers
        // See declaration of Warrior for more details
        autoProvide(kernel, entites);
        let warrior = kernel.get(entites.Warrior);
        expect(warrior.fight()).eql("Using Katana...");

    });

});
