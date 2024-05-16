import RiseLoader from "react-spinners/RiseLoader";

export function Loader(): JSX.Element {
  return (
    <div className="sweet-loading">
        <RiseLoader
        color="orange"
        loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  );
}