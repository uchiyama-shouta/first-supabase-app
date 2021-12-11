import type { ReactNode, VFC } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback: VFC<FallbackProps> = (props) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{props.error.message}</pre>
    </div>
  );
};

type Props = {
  children: ReactNode;
};

export const LayoutErrorBoundary: VFC<Props> = (props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>
  );
};
