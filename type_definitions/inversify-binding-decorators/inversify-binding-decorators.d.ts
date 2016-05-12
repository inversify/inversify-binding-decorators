// Type definitions for inversify 1.0.0-alpha.2
// Project: https://github.com/inversify/inversify-binding-decorators
// Definitions by: inversify <https://github.com/inversify/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../inversify/inversify.d.ts" />

declare namespace inversifyBindingDecorators {

    interface IProvideInSyntax<T> extends IProvideDoneSyntax<T> {
        inSingletonScope(): IProvideWhenOnSyntax<T>;
    }

    interface IProvideDoneSyntax<T> {
        done(): (target: any) => any;
    }

    interface IProvideOnSyntax<T> extends IProvideDoneSyntax<T> {
        onActivation(fn: (context: inversify.IContext, injectable: T) => T): IProvideWhenSyntax<T>;
    }

    interface IProvideInWhenOnSyntax<T> extends IProvideInSyntax<T>, IProvideWhenSyntax<T>, IProvideOnSyntax<T> {}

    interface IProvideWhenOnSyntax<T> extends IProvideWhenSyntax<T>, IProvideOnSyntax<T> {}

    interface IProvideWhenSyntax<T> extends IProvideDoneSyntax<T> {
        when(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T>;
        whenTargetNamed(name: string): IProvideOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): IProvideOnSyntax<T>;
        whenInjectedInto(parent: (Function|string)): IProvideOnSyntax<T>;
        whenParentNamed(name: string): IProvideOnSyntax<T>;
        whenParentTagged(tag: string, value: any): IProvideOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T>;
        whenAnyAncestorNamed(name: string): IProvideOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): IProvideOnSyntax<T>;
        whenNoAncestorNamed(name: string): IProvideOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): IProvideOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T>;
    }

    export function makeProvideDecorator(kernel: inversify.IKernel):
        (serviceIdentifier: (string|Symbol|inversify.INewable<any>)) => (target: any) => any;

    export function makeFluentProvideDecorator(kernel: inversify.IKernel):
        (serviceIdentifier: (string|Symbol|inversify.INewable<any>)) => IProvideInWhenOnSyntax<any>;

}

declare module "inversify-binding-decorators" {
  export = inversifyBindingDecorators;
}
