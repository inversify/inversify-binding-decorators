import Katana from "./katana";
import { inject } from "inversify";

class Warrior {
    private _weapon: Katana;
    public constructor(
        // we need to declare binding because auto-wiring uses
        // @injectbale decorator at runtime not compilation time
        // in the future maybe this limitation will desapear
        // thanks to design-time decorators or some other TS feature
        @inject(Katana) weapon: Katana
    ) {
        this._weapon = weapon;
    }
    public fight() {
        return this._weapon.use();
    }
}

export default Warrior;

