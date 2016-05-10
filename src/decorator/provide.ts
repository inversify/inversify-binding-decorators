/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideInWhenOnSyntax from "../syntax/provide_in_when_on_syntax";

function provide(kernel: inversify.IKernel) {
  return function <T>(serviceIdentifier: (string|Symbol|inversify.INewable<T>)) {
    return new ProvideInWhenOnSyntax(kernel.bind<T>(serviceIdentifier).to(null));
  }
}

export default provide;
