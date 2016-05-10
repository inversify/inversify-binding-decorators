/// <reference path="../interfaces.d.ts" />

interface IProvideInSyntax<T> extends IProvideDoneSyntax<T> {
    inSingletonScope(): IProvideWhenOnSyntax<T>;
}
