/// <reference path="../interfaces.d.ts" />

interface IProvideOnSyntax<T> extends IProvideDoneSyntax<T> {
    onActivation(fn: (context: inversify.IContext, injectable: T) => T): IProvideWhenSyntax<T>;
}
