import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import PeopleTable from './PeopleTable';
import ErrorMessage from './ErrorMessage';
import NotPeople from './NotPeople';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {!isLoading && !people?.length && <NotPeople />}
          {!isLoading && !isError && people?.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
