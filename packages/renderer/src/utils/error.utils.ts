export interface ParsedError {
  type: string | null;
  message: string;
  originalMessage: string;
  isDuplicatedError: boolean;
  isValidationError: boolean;
}

export const parseError = (error: Error): ParsedError => {
  const originalMessage = error.message;

  const electronErrorPattern = /Error invoking remote method '[^']+': (\w+Error): (.+)/;
  const match = originalMessage.match(electronErrorPattern);

  let errorType: string | null = null;
  let cleanMessage: string = originalMessage;

  if (match) {
    errorType = match[1];
    cleanMessage = match[2];
  } else {
    const simpleErrorPattern = /(\w+Error): (.+)/;
    const simpleMatch = originalMessage.match(simpleErrorPattern);

    if (simpleMatch) {
      errorType = simpleMatch[1];
      cleanMessage = simpleMatch[2];
    }
  }

  return {
    type: errorType,
    message: cleanMessage,
    originalMessage,
    isDuplicatedError: errorType?.includes('Duplicated') ?? false,
    isValidationError: errorType?.includes('Invalid') ?? false,
  };
};

export const getErrorMessage = (error: Error): string => {
  return parseError(error).message;
};
