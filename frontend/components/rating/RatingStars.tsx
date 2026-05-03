"use client";

export default function RatingStars({
  onChange,
  score = 0,
  viewOnly = false,
}: {
  onChange?: (value: number) => void;
  score?: number;
  viewOnly?: boolean;
}) {

  const handleClick = (value: number) => {
    if (viewOnly) return;
    onChange?.(value);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => {
        const value = (i + 1) * 2; // cada estrella = 2 puntos
        const isActive = score >= value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            className="focus:outline-none"
          >
            {isActive ? (
              // estrella llena
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
              </svg>
            ) : (
              // estrella vacía
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}