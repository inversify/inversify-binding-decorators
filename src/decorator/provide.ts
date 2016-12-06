import { decorate, injectable } from "inversify";
import { interfaces } from "inversify";

function provide(container: interfaces.Container) {

  // function is named for testing
  return function _provide(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
    let bindingWhenOnSyntax = container.bind<any>(serviceIdentifier).to(<any>null);
    return function (target: any) {
      decorate(injectable(), target);
      let binding: interfaces.Binding<any> = (<any>bindingWhenOnSyntax)._binding;
      binding.implementationType = target;
      return target;
    };
  };
}

export default provide;
