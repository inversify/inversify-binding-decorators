import { decorate } from "inversify";
import provide from "../decorator/provide";
import { interfaces } from "inversify";

function autoProvide(container: interfaces.Container, ...modules: any[]) {

    modules.forEach((module) => {
      Object.keys(module).forEach((key) => {
        let entity = module[key];
        let decorator = provide(entity);
        decorate(decorator, entity);
      });
    });

}

export default autoProvide;
