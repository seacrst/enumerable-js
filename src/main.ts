type Variant<T> = () => T;

function enumarate<V,T extends Record<keyof T, () => V>>(ob: T): [readonly string[], Record<keyof T, (v: V) => number>, () => V] {
  const keys = Object.keys(ob);

  const self: {value: V} = {
    value: {} as V
  };

  keys.forEach((k, i) => {
    // @ts-ignore
    ob[k] = (value: V) => {
      if (self.value != value) {
        self.value = value;
      }
      return i;
    };
    
  });
  
  // @ts-ignore
  return [Object.freeze(keys), ob, () => self.value];
}

type En = number | string;

const [en, { bar, foo}, value] = enumarate<En, {foo: Variant<En>, bar: Variant<En>}>({
  foo: variant(),
  bar: variant()
});

console.log(value());
const v = en[bar("some")];
console.log(v);
console.log(value());

function variant<T>(value: T | number = 0): Variant<T> {
  return () => value as T;
}

type KekOrKik = 'kek' | 'kik';
const a: KekOrKik[] = [ 'kek', 'kik' ];

function toEnumObject<T extends string | number | symbol>(keys: T[]): Record<T, () => void> {
  const ob = keys.reduce((tot, cur, i) => {
    // @ts-ignore
    tot[cur] = () => i;
    return tot;
  }, {} as Record<T, () => void>);

  return Object.seal(ob);
}

const ea = toEnumObject(a);


const [enumaration, {kek, kik}, state] = enumarate<number | void, Record<KekOrKik, Variant<number | void>>>(ea);


console.log(enumaration[kik(22)]);
console.log("state ==>  ", state());
console.log("index ==> ", kek());
console.log("state ==>  ", state());