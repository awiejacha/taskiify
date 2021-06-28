import Repository from '../Domain/Repository';
import Task from '../Domain/ValueObjects/Task';
import { Knex } from 'knex/types';
import Location from '../Domain/ValueObjects/Location';
import TaskDefinition from '../Domain/ValueObjects/TaskDefinition';
import TaskState from '../Domain/ValueObjects/TaskState';
import Person from '../Domain/ValueObjects/Person';

type Row = {
  id: string;
  id_location: number;
  id_definition: number;
  id_state: number;
  id_assignee?: number;
  id_responsible?: number;
};

const getIdLocation = (location: string): number =>
  Location.ALL_LOCATIONS.indexOf(location);

const getIdDefinition = (definition: string): number =>
  TaskDefinition.ALL_DEFINITIONS.indexOf(definition);

const getIdState = (state: string): number =>
  TaskState.ALL_STATES.indexOf(state);

const getIdPerson = (person: string): number =>
  Person.ALL_PERSONS.indexOf(person);

const getLocation = (locationId: number): Location =>
  new Location(Location.ALL_LOCATIONS[locationId]);

const getDefinition = (definitionId: number): TaskDefinition =>
  new TaskDefinition(TaskDefinition.ALL_DEFINITIONS[definitionId]);

const getState = (stateId: number): TaskState =>
  new TaskState(TaskState.ALL_STATES[stateId]);

const getPerson = (personId: number): Person =>
  new Person(Person.ALL_PERSONS[personId]);

const rowToTask = (row: Row): Task => {
  const assignee = row.id_assignee ? getPerson(row.id_assignee) : null;
  const responsible = row.id_responsible ? getPerson(row.id_responsible) : null;

  return new Task(
    row.id,
    getLocation(row.id_location),
    getDefinition(row.id_definition),
    getState(row.id_state),
    assignee,
    responsible,
  );
};

const taskToRow = (task: Task): Row => {
  return {
    id: task.id,
    id_location: getIdLocation(task.location.name),
    id_definition: getIdDefinition(task.definition.name),
    id_state: getIdState(task.state.name),
    id_assignee: task.assignee ? getIdPerson(task.assignee.name) : null,
    id_responsible: task.responsible ? getIdPerson(task.responsible.name) : null,
  };
};

export default class KnexRepository implements Repository {
  constructor(private knex: Knex) {}

  async findNotDone(): Promise<Task[]> {
    const results: Row[] = await this.knex.select('*')
      // @ts-ignore
      .from('tasks')
      .whereNot('id_state', getIdState(TaskState.DONE));
    return results.map(rowToTask);
  }

  async findById(id: string): Promise<Task|null> {
    const results: Row[] = await this.knex.select('*')
      // @ts-ignore
      .from('tasks')
      .where('id', id);
    return results.length ? rowToTask(results[0]) : null;
  }

  async add(task: Task): Promise<void> {
    await this.knex('tasks')
      .insert(taskToRow(task))
      .onConflict('id')
      .merge()
    ;
  }
}
