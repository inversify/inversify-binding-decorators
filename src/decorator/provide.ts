import { decorate, injectable } from "inversify";
import { interfaces } from "inversify";

function provide(kernel: interfaces.Kernel) {

  // function is named for testing
  return function _provide(serviceIdentifier: interfaces.ServiceIdentifier<any>) {
    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);
    return function (target: any) {
      decorate(injectable(), target);
      let binding: interfaces.Binding<any> = (<any>bindingWhenOnSyntax)._binding;
      binding.implementationType = target;
      return target;
    };
  };
}

export default provide;
