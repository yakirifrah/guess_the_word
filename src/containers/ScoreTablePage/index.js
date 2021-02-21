import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Header, Button } from '../../components';
import { useHistory } from 'react-router-dom';
import './style.scss';

const ScoreTable = () => {
  const { scoreTable } = useSelector((state) => state.app);
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
    ],
    [],
  );
  const handleOnClick = () => history.push('/game');

  return (
    <div className="ScoreTable">
      <Header title={'Score table'} />
      {!scoreTable.length ? <Header title={'No information display'} /> : <Table columns={columns} data={scoreTable} />}
      <Button label={'Play again'} className={'play_again'} handleOnClick={handleOnClick} />
    </div>
  );
};

export default ScoreTable;
