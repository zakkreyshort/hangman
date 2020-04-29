import React from 'react';
import HangmanImage from './HangmanImage';
import AnswerForm from './AnswerForm';
import Keys from './Keys';

class HangmanControl extends React.Component {

    // constructor(){

    // }

  render() {
    return (
      <React.Fragment>
        <HangmanImage />
        <AnswerForm />
        <Keys />
      </React.Fragment>
    )
  }
}

export default HangmanControl;