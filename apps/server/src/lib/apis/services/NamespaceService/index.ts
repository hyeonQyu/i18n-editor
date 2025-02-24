import { createNamespace } from './createNamespace';
import { createTranslation } from './createTranslation';
import { getNamespace } from './getNamespace';
import { updateTranslation } from './updateTranslation';

const namespaceService = {
  getNamespace,
  createNamespace,
  createTranslation,
  updateTranslation,
};

export default namespaceService;
