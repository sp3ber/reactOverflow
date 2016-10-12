import React, { PropTypes } from 'react';
import cn from 'classnames';

const QuestionsTable = (props) => {
  const { questions } = props;
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Author</th>
            <th>Title</th>
            <th>Answered?</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
              /**
               * Use key={index} instead of key={answer_id} or etc
               * because api can give items with the same id's
               */
            <tr key={index} className={cn({ 'table-success': question.is_answered })}>
              <th scope="row">{index}</th>
              <td>{question.creation_date}</td>
              <td><a href={question.link}>{question.title}</a></td>
              <td>{question.owner.display_name}</td>
              <td>{!!question.is_answered ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

QuestionsTable.propTypes = {
  questions: PropTypes.array
};

export default QuestionsTable;
