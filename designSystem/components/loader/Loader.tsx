interface ILoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: ILoaderProps) => {
  if (!isLoading) return null;

  return (
    <div
      data-testid="loader-test"
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
    >
      <div
        data-testid="spinner-test"
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"
      ></div>
    </div>
  );
};

export default Loader;
export type { ILoaderProps };
