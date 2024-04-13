"use strict";
function enumarate(ob) {
    const keys = Object.keys(ob);
    const self = {
        value: {}
    };
    keys.forEach((k, i) => {
        // @ts-ignore
        ob[k] = (value) => {
            if (self.value != value) {
                self.value = value;
            }
            return i;
        };
    });
    // @ts-ignore
    return [Object.freeze(keys), ob, () => self.value];
}
const [en, { bar, foo }, value] = enumarate({
    foo: variant(),
    bar: variant()
});
console.log(value());
const v = en[bar("some")];
console.log(v);
console.log(value());
function variant(value = 0) {
    return () => value;
}
const a = ['kek', 'kik'];
function toEnumObject(keys) {
    const ob = keys.reduce((tot, cur, i) => {
        // @ts-ignore
        tot[cur] = () => i;
        return tot;
    }, {});
    return Object.seal(ob);
}
const ea = toEnumObject(a);
const [enumaration, { kek, kik }, state] = enumarate(ea);
console.log(enumaration[kik(22)]);
console.log("state ==>  ", state());
console.log("index ==> ", kek());
console.log("state ==>  ", state());
