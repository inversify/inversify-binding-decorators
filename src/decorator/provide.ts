import { decorate, injectable, METADATA_KEY } from "inversify";
import { interfaces } from "inversify";

function provide(container: interfaces.Container) {
  return function _provide(
    serviceIdentifier: interfaces.ServiceIdentifier<any>,
    force?: boolean
  ) {
    let bindingWhenOnSyntax = container.bind<any>(serviceIdentifier).to(<any>null);
    return function (target: any) {

      const isAlreadyDecorated = Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target);
      const redecorateWithInject = force === true;

     if (redecorateWithInject === true && isAlreadyDecorated === false) {
        decorate(injectable(), target);
      } else if (redecorateWithInject === true && isAlreadyDecorated === true) {
        // Do nothing
      } else {
        try {
          decorate(injectable(), target);
        } catch (e) {
          throw new Error(
            "Cannot apply @provide decorator multiple times but is has been used " +
            `multiple times in ${target.name} ` +
            "Please use @provide(ID, true) if you are trying to declare multiple bindings!"
          );
        }
     }

     let binding: interfaces.Binding<any> = (<any>bindingWhenOnSyntax)._binding;
     binding.implementationType = target;
     return target;

    };
  };
}

export default provide;
