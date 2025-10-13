export class WorkspaceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WorkspaceNotFoundError';
  }
}

export class InvalidWorkspaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidWorkspaceError';
  }
}

export class InvalidRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRequestError';
  }
}

export class DuplicatedWorkspaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedWorkspaceError';
  }
}

export class DuplicatedNamespaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedNamespaceError';
  }
}

export class DuplicatedTranslationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedTranslationError';
  }
}

export class TranslationNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranslationNotFoundError';
  }
}
