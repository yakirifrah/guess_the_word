import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash/fp';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Header } from '../../components/Shared';
import { insertDataToTableScore } from '../../store/actions';
import './stlye.scss';

const GameOverPage = () => {
  let { register, handleSubmit, errors } = useForm();
  const { scoreTable, victoryPlayerPoints, requestToInsertScoreTableFulfilled } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (requestToInsertScoreTableFulfilled) {
      history.push('/score-table');
    }
  }, [history, requestToInsertScoreTableFulfilled]);
  const onSubmit = (data) => {
    console.log({ data });
    if (victoryPlayerPoints === 0) return;
    data = { ...data, score: victoryPlayerPoints };
    const { name, phoneNumber, score: myCurrentScore } = data;
    if (!scoreTable.length) return dispatch(insertDataToTableScore(data));
    const index = scoreTable.findIndex((obj) => obj.name === name && obj.phoneNumber === phoneNumber);
    console.log({ index });
    if (index !== -1) {
      const { score } = scoreTable[index];
      if (myCurrentScore > score) {
        return dispatch(insertDataToTableScore(data, index));
      } else {
        return history.push('/score-table');
      }
    }
    return dispatch(insertDataToTableScore(data));
  };

  return (
    <div className="GameOver">
      <Header title="Game Over" size="xlg" />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Input
          ref={register({ required: true, maxLength: 20, minLength: 2, pattern: /^[a-zA-Z].*[\s.]*$/g })}
          name="name"
          style={`form`}
          label="Full Name"
        />
        {_.get('name.type', errors) === 'required' && <p className="error__input">This field is required</p>}
        {_.get('name.type', errors) === 'minLength' && (
          <p className="error__input">This name must be contain at least two chars</p>
        )}
        {_.get('name.type', errors) === 'maxLength' && (
          <p className="error__input">First name can not exceed 20 characters</p>
        )}
        <Input
          ref={register({ required: true, minLength: 10, maxLength: 10, pattern: /^[0-9]+$/i })}
          name="phoneNumber"
          style={`form`}
          label="Phone Number"
        />
        {_.get('phoneNumber.type', errors) === 'maxLength' && (
          <p className="error__input">The phone number field must be contain 10 numbers</p>
        )}
        {_.get('phoneNumber.type', errors) === 'minLength' && (
          <p className="error__input">The phone number field must be contain 10 numbers</p>
        )}
        {_.get('phoneNumber.type', errors) === 'required' && <p className="error__input">This field is required</p>}
        {_.get('phoneNumber.type', errors) === 'pattern' && <p className="error__input">Numbers characters only</p>}
        <Input type="submit" style={`submit u-mt-20`} />
      </Form>
    </div>
  );
};

export default GameOverPage;
