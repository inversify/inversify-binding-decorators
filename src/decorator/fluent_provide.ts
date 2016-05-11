/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideInWhenOnSyntax from "../syntax/provide_in_when_on_syntax";
import ProvideWhenSyntax from "../syntax/provide_when_syntax";
import ProvideOnSyntax from "../syntax/provide_on_syntax";
import ProvideInSyntax from "../syntax/provide_in_syntax";

function fluentProvide(kernel: inversify.IKernel) {

  // function is named for testing
  return function _fluentProvide(serviceIdentifier: (string|Symbol|inversify.INewable<any>)) {

    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);

    let provideInWhenOnSyntax = new ProvideInWhenOnSyntax<any>(
      new ProvideInSyntax<any>(bindingWhenOnSyntax),
      new ProvideWhenSyntax<any>(bindingWhenOnSyntax),
      new ProvideOnSyntax<any>(bindingWhenOnSyntax)
    );

    return provideInWhenOnSyntax;

  };
}

export default fluentProvide;
