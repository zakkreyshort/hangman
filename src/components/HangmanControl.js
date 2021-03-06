import React from 'react';
import HangmanImage from './HangmanImage';
import AnswerForm from './AnswerForm';
import KeyList from './KeyList';
import randomWord from './Words';
import PlayingGame from './PlayingGame';
import { connect } from 'react-redux';

class HangmanControl extends React.Component {

    static defaultProp = {
        maxWrong: 6,
    }

    constructor(props){
      super(props);
      this.state = {
        mistake: 0,
        answer: randomWord().split("").map(answerChar => ( { correctChoice: false, answerLetter: answerChar })),
        keyList: "abcdefghijklmnopqrstuvwxyz".split("").map(char => (
          { onKeySelection: false, letter: char}
        ))
      }
    }

    handleUpdateKeyList = (keyGuessed) => {
      console.log(this.state);
      const { dispatch } = this.props;
      const { letter, selected } = keyGuessed;
      const action = {
        type: 'SELECT_KEY',
        letter: letter,
        selected: selected,
        keyList: this.state.keyList
      }
      dispatch(action);
    }


    // handleEditingTicketInList = (ticketToEdit) => {
    //   const { dispatch } = this.props;
    //   const { id, names, location, issue } = ticketToEdit;
    //   const action = {
    //     type: 'ADD_TICKET',
    //     id: id,
    //     names: names,
    //     location: location,
    //     issue: issue,
    //   }
    //   dispatch(action);
    //   this.setState({
    //     editing: false,
    //     selectedTicket: null
    //   });
    // }
    


    // handleUpdateKeyList = (keyGuessed) => {
    //   const editedKeyList = this.state.keyList
    //     .filter(key => key.letter !== keyGuessed.letter)
    //     .concat(keyGuessed)
    //   this.handleCompareKey(keyGuessed);
    //   this.setState({
    //     keyList: editedKeyList,
    //   });
    // }


    handleCompareKey = (keyGuessed) => {
      const answerCheck = this.state.answer
      let mistakeCheck = 1
      for (let i=0; i < answerCheck.length; i++ ) {
        if (answerCheck[i].answerLetter === keyGuessed.letter) {
          answerCheck[i].correctChoice = true;
          mistakeCheck = 0;
        }
      }
      this.setState({
        mistake: this.state.mistake + mistakeCheck,
        answer: answerCheck
      });
    }
    
    handleAnswerDisplay = () => {
      console.log(this.state.answer);
      const answerDisplay = this.state.answer.map((char) => {
        console.log(char.correctChoice);
        if (char.correctChoice === true) {
          return char.answerLetter;
        } else {
          return "__";
        }
      })
      return answerDisplay; 
    }

    handleChangingSelectedKey = (letter) => {
        const selectedKey = this.props.keyList[letter];
        this.setState({selectedKey: selectedKey});
    }


  render() {
   
      let currentlyVisibleState = null;
      let gameStatWin = "You win!";
      const gameStatLose = "You lose!"
      

        if (this.state.mistake >= this.props.maxWrong) {
          currentlyVisibleState = <p>{gameStatLose}</p>
        }
       
        if (this.state.answer.includes("_")){
        currentlyVisibleState = <p>{gameStatWin}</p>
        }
          
        else {
          currentlyVisibleState = <PlayingGame 
            img= {this.state.mistake} 
            answer={this.handleAnswerDisplay()} 
            keyList={this.props.keyList.filter(k => k.selected !== true)}
            onKeySelection={this.handleUpdateKeyList}/>    
        }

    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>

    )
  }
}

// HangmanControl = {
//     masterItemList: PropTypes.object
//   };

HangmanControl = connect()(HangmanControl);

export default HangmanControl;