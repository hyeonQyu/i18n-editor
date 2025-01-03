import { createTranslation } from './createTranslation';
import { getNamespace } from './getNamespace';
import { createNamespace } from './postNamespace';

const namespaceService = {
  getNamespace,
  createNamespace,
  createTranslation,
};

export default namespaceService;
