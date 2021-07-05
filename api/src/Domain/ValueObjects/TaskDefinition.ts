export default class TaskDefinition {
  public static readonly TIDYING_UP = 'tidying_up';
  public static readonly ALL_DEFINITIONS = [TaskDefinition.TIDYING_UP];

  constructor(public readonly name: string) {}
}
