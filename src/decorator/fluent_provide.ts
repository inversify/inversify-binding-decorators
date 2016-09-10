import ProvideInWhenOnSyntax from "../syntax/provide_in_when_on_syntax";
import ProvideWhenSyntax from "../syntax/provide_when_syntax";
import ProvideOnSyntax from "../syntax/provide_on_syntax";
import ProvideInSyntax from "../syntax/provide_in_syntax";
import ProvideDoneSyntax from "../syntax/provide_done_syntax";
import interfaces from "../interfaces/interfaces";
import { interfaces as inversifyInterfaces } from "inversify";

function fluentProvide(kernel: inversifyInterfaces.Kernel) {

  // function is named for testing
  return function _fluentProvide(serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>) {

    let bindingWhenOnSyntax = kernel.bind<any>(serviceIdentifier).to(null);
    let binding = (<any>bindingWhenOnSyntax)._binding;
    let provideDoneSyntax = new ProvideDoneSyntax(binding);

    let provideInWhenOnSyntax: interfaces.ProvideInWhenOnSyntax<any> = new ProvideInWhenOnSyntax<any>(
      new ProvideInSyntax<any>(bindingWhenOnSyntax, provideDoneSyntax),
      new ProvideWhenSyntax<any>(bindingWhenOnSyntax, provideDoneSyntax),
      new ProvideOnSyntax<any>(bindingWhenOnSyntax, provideDoneSyntax)
    );

    return provideInWhenOnSyntax;

  };
}

export default fluentProvide;
