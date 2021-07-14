import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskCreate } from '../services/api';
import locationsStore from '../stores/locations';
import taskDefinitionsStore from '../stores/task-definitions';
import tasksStore from '../stores/tasks';

export default function ActionCreate() {
  const [taskDefinitions] = useRecoilState(taskDefinitionsStore);
  const [locations] = useRecoilState(locationsStore);

  const taskDefinitionOptions = taskDefinitions.all.map((entry) => ({
    // TODO: Translate label
    value: entry,
    label: entry,
  }));
  const locationOptions = locations.slice(1).map((entry) => ({
    // TODO: Translate label
    value: entry,
    label: entry,
  }));

  const [tasks, setTasks] = useRecoilState(tasksStore);

  const [selectedTaskDefinition, setSelectedTaskDefinition] = useState(taskDefinitionOptions[0].value);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].value);
  const [isLocationSelectDisabled, setIsLocationSelectDisabled] = useState(
    !taskDefinitions.locationSpecific.includes(selectedTaskDefinition)
  );

  const onTaskDefinitionSelectChange = (event) => {
    setSelectedTaskDefinition(event.target.value);
    setIsLocationSelectDisabled(!taskDefinitions.locationSpecific.includes(event.target.value));
  };

  const onLocationSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const onTaskCreate = (createdTask) => {
    const transformedTasks = { ...tasks };
    transformedTasks[createdTask.id] = createdTask;
    setTasks(transformedTasks);
  };

  const onButtonClick = (event) => {
    event.preventDefault();
    // TODO: Error handling
    taskCreate(isLocationSelectDisabled ? locations[0] : selectedLocation, selectedTaskDefinition).then((createdTask) =>
      onTaskCreate(createdTask)
    );
  };

  return (
    <div>
      <select value={selectedTaskDefinition} onChange={onTaskDefinitionSelectChange}>
        {taskDefinitionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={selectedLocation}
        disabled={isLocationSelectDisabled}
        onChange={onLocationSelectChange}
        onLoad={onLocationSelectChange}
      >
        {locationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="submit" onClick={onButtonClick}>
        ➕
      </button>
    </div>
  );
}
