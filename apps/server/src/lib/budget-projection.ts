import type { Logger } from '@nestjs/common';

export function runBudgetProjection(
  logger: Logger,
  context: string,
  task: Promise<void>,
): void {
  void task.catch((error: unknown) => {
    logger.warn(
      `Budget snapshot projection failed (${context})`,
      error instanceof Error ? error.stack : String(error),
    );
  });
}
