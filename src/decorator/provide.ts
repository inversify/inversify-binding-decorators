/// <reference path="../interfaces/interfaces.d.ts" />

import { decorate, injectable } from "inversify";

function provide(kernel: inversify.IKernel) {

  // function is named for testing
  return function _provide(serviceIdentifier: (string|Symbol|inversify.INewable<any>)) {
    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);
    return function (target: any) {
      decorate(injectable(), target);
      let binding: inversify.IBinding<any> = (<any>bindingWhenOnSyntax)._binding;
      binding.implementationType = target;
      return target;
    };
  };
}

export default provide;
