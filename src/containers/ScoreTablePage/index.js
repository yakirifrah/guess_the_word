import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetLifePlayer } from '../../store/actions';
import { Table, Header, Button } from '../../components';
import './style.scss';

const ScoreTablePage = () => {
  const { scoreTable } = useSelector((state) => state.app);
  const dispatch = useDispatch();
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
  const handleOnClick = () => {
    dispatch(resetLifePlayer());
    return history.push('/game', { from: 'TableScorePage' });
  };

  return (
    <div className="ScoreTable">
      <Header title={'Score table'} />
      {!scoreTable.length ? <Header title={'No information display'} /> : <Table columns={columns} data={scoreTable} />}
      <Button label={'Play again'} className={'play_again'} handleOnClick={handleOnClick} />
    </div>
  );
};

export default ScoreTablePage;
