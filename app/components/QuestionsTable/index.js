import React, { PropTypes, Component } from 'react';
import cn from 'classnames';

const QuestionsTable = (props) => {
  const { questions } = props;
  console.log(questions[0]);
  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Author</th>
        <th>Title</th>
      </tr>
      </thead>
      <tbody>
      {questions.map((question, index) => {
        return (
          <tr key={index} className={cn({'table-success': question.is_answered})}>
            <th scope="row">{index}</th>
            <td>{question.creation_date}</td>
            <td>{question.title}</td>
            <td>{question.owner.display_name}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
};

export default QuestionsTable;