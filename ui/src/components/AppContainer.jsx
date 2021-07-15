import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import locationsStore from '../stores/locations';
import personsStore from '../stores/persons';
import taskDefinitionsStore from '../stores/task-definitions';
import tasksStore from '../stores/tasks';
import TasksTable from './TasksTable';

export default function AppContainer() {
  const setLocations = useRecoilState(locationsStore)[1];
  const setPersons = useRecoilState(personsStore)[1];
  const setTaskDefinitions = useRecoilState(taskDefinitionsStore)[1];
  const setTasks = useRecoilState(tasksStore)[1];
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
    ]).then(() => {
      // TODO: Handle errors
      setIsLoaded(true);
    });
  }, [setLocations, setPersons, setTaskDefinitions, setTasks]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TasksTable />
    </div>
  );
}
