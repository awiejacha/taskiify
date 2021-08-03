import Location from '../../domain/ValueObjects/Location';
import TaskDefinition from '../../domain/ValueObjects/TaskDefinition';
import makeTaskService from '../dependency-injection/make-task-service';

(async function crateKitchenTidyingUp() {
  try {
    await makeTaskService().createExclusive(
      Location.KITCHEN,
      TaskDefinition.TIDYING_UP,
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
