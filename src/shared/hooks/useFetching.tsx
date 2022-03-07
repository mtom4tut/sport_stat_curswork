import { useState } from 'react';

// Components
import { MyMessage } from '~shared/ui/MyMessage';

/**
 * Хук useFetching выполняет обработку переданной в него callback фунции
 *
 * @params {Function} - callback функция
 *
 * @returns {Array} массив состоящий из:
 * - fetching - функция обработчик
 * - isLoading - статус выполнения
 * - error - список ошибок
 */
export const useFetching = (
  callback: () => void
): [fetching: () => Promise<void>, isLoading: boolean, error: string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setError('');
      setIsLoading(true);
      await callback();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        MyMessage('error', 'Ошибка', err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
