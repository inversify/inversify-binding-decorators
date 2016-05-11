/// <reference path="../interfaces/interfaces.d.ts" />

function provide(kernel: inversify.IKernel) {
  return function (serviceIdentifier: (string|Symbol|inversify.INewable<any>)) {
    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);
    return function (target: any) {
      let binding: inversify.IBinding<any> = (<any>bindingWhenOnSyntax)._binding;
      binding.implementationType = target;
      return target;
    };
  };
}

export default provide;
