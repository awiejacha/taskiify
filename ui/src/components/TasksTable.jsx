import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import personsAtom from '../stores/persons';
import TaskCell from './TaskCell';
import tasksAtom from '../stores/tasks';

export default function TasksTable() {
  // eslint-disable-next-line no-unused-vars
  const [persons, setPersons] = useRecoilState(personsAtom);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // TODO: Will be acquired from rest API
    setPersons(['anusia', 'krystek', 'karolek', 'adrianek']);
  }, [setPersons]);

  useEffect(() => {
    // TODO: Hardcoded
    fetch('http://localhost:3000/tasks/list')
      .then((res) => res.json())
      .then(
        (fetchedTasksList) => {
          const listedTasks = {};
          fetchedTasksList.forEach((task) => {
            listedTasks[task.id] = task;
          });
          setTasks(listedTasks);
          setIsLoaded(true);
        },
        // TODO: Handle error
        // eslint-disable-next-line no-unused-vars
        (error) => {
          setTasks({});
          setIsLoaded(false);
        }
      );
  }, [setTasks]);

  const renderCell = (renderState, task) =>
    task.state === renderState ? <TaskCell key={task.id} task={task} /> : <td />;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
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
          <tr>
            {renderCell('pending', task)}
            {renderCell('ongoing', task)}
            {renderCell('in_review', task)}
            {renderCell('done', task)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
