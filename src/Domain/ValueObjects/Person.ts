export default class Person {
  public static readonly ANUSIA = 'anusia';
  public static readonly KRYSTEK = 'krystek';
  public static readonly KAROLEK = 'karolek';
  public static readonly ADRIAN = 'adrian';
  public static readonly ALL_PERSONS = [
    Person.ANUSIA,
    Person.KRYSTEK,
    Person.KAROLEK,
    Person.ADRIAN,
  ];

  constructor(public readonly name: string) {}
}
