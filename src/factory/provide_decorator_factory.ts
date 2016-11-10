import provide from "../decorator/provide";
import { interfaces } from "inversify";

function makeProvideDecorator(container: interfaces.Container) {
    return provide(container);
}

export default makeProvideDecorator;
