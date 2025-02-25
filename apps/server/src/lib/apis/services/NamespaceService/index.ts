import { createNamespace } from './createNamespace';
import { createTranslation } from './createTranslation';
import { deleteTranslation } from './deleteTranslation';
import { getNamespace } from './getNamespace';
import { updateTranslation } from './updateTranslation';

const namespaceService = {
  getNamespace,
  createNamespace,
  createTranslation,
  updateTranslation,
  deleteTranslation,
};

export default namespaceService;
