export async function taskAssign(id, assignee) {
  // TODO: Hardcoded URL
  return fetch(`http://localhost:3000/tasks/${id}/assign/${assignee}`, {
    method: 'PUT',
  }).then((res) => res.json());
  // TODO: Error handling
}

export async function taskProgress(id) {
  // TODO: Hardcoded URL
  return fetch(`http://localhost:3000/tasks/${id}/progress`, {
    method: 'PUT',
  }).then((res) => res.json());
  // TODO: Error handling
}

export async function taskRegress(id) {
  // TODO: Hardcoded URL
  return fetch(`http://localhost:3000/tasks/${id}/regress`, {
    method: 'PUT',
  }).then((res) => res.json());
  // TODO: Error handling
}
