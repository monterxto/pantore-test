import { TransformFnParams } from 'class-transformer/types/interfaces';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): string => params.value?.toLowerCase().trim();
