/// <reference path="../interfaces.d.ts" />

interface IProvideDoneSyntax<T> {
    done(): (target: any) => any;
}
