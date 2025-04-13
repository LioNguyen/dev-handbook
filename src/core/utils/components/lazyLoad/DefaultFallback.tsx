import { FC } from "react";

interface DefaultFallbackProps {
  error?: Error | null;
  retry?: () => void;
}

// Default fallback component
const DefaultFallback: FC<DefaultFallbackProps> = ({ error, retry }) => {
  if (error) {
    return (
      <div className="error-fallback" role="alert">
        <p>Failed to load: {error.message}</p>
        {retry && <button onClick={retry}>Retry</button>}
      </div>
    );
  }

  return <div className="loading-fallback">Loading...</div>;
};

export default DefaultFallback;
export type { DefaultFallbackProps };
