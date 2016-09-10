import provide from "../decorator/provide";
import { interfaces } from "inversify";

function makeProvideDecorator(kernel: interfaces.Kernel) {
    return provide(kernel);
}

export default makeProvideDecorator;
