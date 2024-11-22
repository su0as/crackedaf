interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 p-4 rounded-md">
      <div className="flex">
        <div className="flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {retry && (
          <div className="pl-3">
            <button
              onClick={retry}
              className="bg-red-50 rounded-md text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}