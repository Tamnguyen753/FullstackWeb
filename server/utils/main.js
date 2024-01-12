import { v4 as uuidv4 } from 'uuid';

function newID() {
    return uuidv4();
  }

export default newID