import { decorate, injectable } from "inversify";

function provide(kernel: inversify.interfaces.Kernel) {

  // function is named for testing
  return function _provide(serviceIdentifier: (string|Symbol|inversify.interfaces.Newable<any>)) {
    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);
    return function (target: any) {
      decorate(injectable(), target);
      let binding: inversify.interfaces.Binding<any> = (<any>bindingWhenOnSyntax)._binding;
      binding.implementationType = target;
      return target;
    };
  };
}

export default provide;
