import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import locationsStore from '../stores/locations';
import personsStore from '../stores/persons';
import taskDefinitionsStore from '../stores/task-definitions';
import ActionCreate from './ActionCreate';
import TaskCell from './TaskCell';
import tasksStore from '../stores/tasks';

export default function TasksTable() {
  const setLocations = useRecoilState(locationsStore)[1];
  const setPersons = useRecoilState(personsStore)[1];
  const setTaskDefinitions = useRecoilState(taskDefinitionsStore)[1];
  const [tasks, setTasks] = useRecoilState(tasksStore);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      // TODO: Hardcoded
      fetch('http://localhost:3000/locations/list')
        .then((res) => res.json())
        .then((fetchedLocationsList) => {
          setLocations(fetchedLocationsList);

          return Promise.resolve();
        }),
      // TODO: Hardcoded
      fetch('http://localhost:3000/persons/list')
        .then((res) => res.json())
        .then((fetchedPersonsList) => {
          setPersons(fetchedPersonsList);

          return Promise.resolve();
        }),
      // TODO: Hardcoded
      fetch('http://localhost:3000/task-definitions/list')
        .then((res) => res.json())
        .then((fetchedTaskDefinitionsList) => {
          setTaskDefinitions(fetchedTaskDefinitionsList);

          return Promise.resolve();
        }),
      // TODO: Hardcoded
      fetch('http://localhost:3000/tasks/list')
        .then((res) => res.json())
        .then((fetchedTasksList) => {
          const listedTasks = {};
          fetchedTasksList.forEach((task) => {
            listedTasks[task.id] = task;
          });
          setTasks(listedTasks);

          return Promise.resolve();
        }),
    ])
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        // TODO: Handle errors
        // eslint-disable-next-line no-console
        console.error(error);
        setIsLoaded(false);
      });
  }, [setLocations, setPersons, setTaskDefinitions, setTasks]);

  const renderCell = (renderState, task) =>
    task.state === renderState ? <TaskCell key={task.id} task={task} /> : <td />;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ActionCreate />
      <table>
        <thead>
          <tr>
            <th>Pending</th>
            <th>Ongoing</th>
            <th>In review</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(tasks).map((task) => (
            <tr key={task.id}>
              {renderCell('pending', task)}
              {renderCell('ongoing', task)}
              {renderCell('in_review', task)}
              {renderCell('done', task)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
