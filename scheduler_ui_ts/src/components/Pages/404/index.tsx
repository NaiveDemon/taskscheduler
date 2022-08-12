import { Link } from 'react-router-dom';

export function PageNotFound(): JSX.Element {
  return (
    <div>
      Oops! This page doesn't exits.
      <Link to='/'>Go back</Link>.
    </div>
  );
}
