import { createTranslation } from './createTranslation';
import { getNamespace } from './getNamespace';
import { createNamespace } from './postNamespace';
import { updateTranslation } from './updateTranslation';

const namespaceService = {
  getNamespace,
  createNamespace,
  createTranslation,
  updateTranslation,
};

export default namespaceService;
