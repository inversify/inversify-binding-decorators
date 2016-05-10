/// <reference path="../interfaces.d.ts" />

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
