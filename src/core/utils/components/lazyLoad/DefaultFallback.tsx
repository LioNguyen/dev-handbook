import { FC } from "react";

// Fallback component props
export interface FallbackProps {
  error?: Error | null;
  retry?: () => void;
}

// Default fallback component
const DefaultFallback: FC<FallbackProps> = ({ error, retry }) => {
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
