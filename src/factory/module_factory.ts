import interfaces from "../interfaces/interfaces";
import { METADATA_KEY } from "../constants";
import { interfaces as inversifyInterfaces, ContainerModule } from "inversify";

function buildProviderModule(): inversifyInterfaces.ContainerModule {
    return new ContainerModule((bind, unbind) => {
        let provideMetadata: interfaces.ProvideSyntax[] = Reflect.getMetadata(METADATA_KEY.provide, Reflect) || [];
        provideMetadata.map(metadata => resolve(metadata, bind));
    });
}

function resolve(metadata: interfaces.ProvideSyntax, bind: inversifyInterfaces.Bind) {
    return metadata.constraint(bind, metadata.implementationType);
}
export default buildProviderModule;
