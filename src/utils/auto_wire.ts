import { decorate } from "inversify";
import makeProvideDecorator from "../factory/provide_decorator_factory";
import { interfaces } from "inversify";

function autoProvide(kernel: interfaces.Kernel, ...modules: any[]) {

    let provide = makeProvideDecorator(kernel);

    modules.forEach((module) => {
      Object.keys(module).forEach((key) => {
        let entity = module[key];
        let decorator = provide(entity);
        decorate(decorator, entity);
      });
    });

}

export default autoProvide;
