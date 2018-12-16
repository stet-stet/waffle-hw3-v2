import React, { Component } from 'react';

const Qno = 6;
function Line(props){
  return <div className="bg-light" style={{width:"95%",height:2,marginLeft:"auto",marginRight:"auto",marginTop:"20px",marginBottom:"20px"}} />
}
function Rectangle(props){
  if(props.green)
    return <p className="text-light btn btn-success"><b>{props.foodName}</b></p> ;
  else 
    return <p className="text-light btn btn-danger"><b>{props.foodName}</b></p> ;
}

function StartScreen(props){
  return (
    <div>
      <p style={{fontSize:36}}>Compare your tastes with {props.author}</p>
      <Line />
      <p style={{marginBottom:0}}>Please type in your name and push "start"!</p>
      <p style={{fontSize:9,margin:0}}>The enter key does not work. Sorry!</p>
      <input type="text" onChange={props.onChange} placeholder={props.name} />
      <button onClick={props.onClick} className="btn btn-primary">Start!</button>
    </div>
  );
}

function QuestionScreen(props){
  return(
    <div>
      <pre style={{fontSize:10}}>QUESTION {props.number}/{Qno} |

      Compare your tastes with {props.author}</pre>
      <p className="display-4">{props.question}?</p>
      <Line />
      <button data-choicename="like" onClick={props.onClick} className="btn btn-success btn-block">LIKE!</button>
      <button data-choicename="dislike" onClick={props.onClick} className="btn btn-danger btn-block">DISLIKE!</button>
    </div>
  );
}

function ResultScreen(props){
  return(
    <div>
      <p className="text-center" style={{fontSize:24}}>Your preferences match about</p>
      <p className="display-3 text-center">{props.score}<span style={{fontSize:9}}>%</span></p>
      <p className="text-center" style={{fontSize:24}}>with {props.author}!</p>
      <Line/>
      <p> {props.player}'s (your) response: </p>
      <Rectangle foodName={props.questions[0].subject} green={props.answers[1]=="like"}/>
      <Rectangle foodName={props.questions[1].subject} green={props.answers[2]=="like"}/>
      <Rectangle foodName={props.questions[2].subject} green={props.answers[3]=="like"}/>
      <Rectangle foodName={props.questions[3].subject} green={props.answers[4]=="like"}/>
      <Rectangle foodName={props.questions[4].subject} green={props.answers[5]=="like"}/>
      <Rectangle foodName={props.questions[5].subject} green={props.answers[6]=="like"}/>
      <br/>
      <button className="btn btn-primary btn-block" onClick={props.onClick}>Try again?</button>
    </div>
  );
}

class HobulhoApp extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      step:0,
      name:"anon",
      answers:{
        1:"dislike",
        2:"dislike",
        3:"dislike",
        4:"dislike",
        5:"dislike",
        6:"dislike",
      },
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleChoiceClick = this.handleChoiceClick.bind(this);
    this.handleBackToHomeClick = this.handleBackToHomeClick.bind(this);
  }
  handleNameChange(event){
    this.setState({
      name: event.target.value,
    });
  }
  handleNameSubmit(event){
    this.setState({
      step: 1,
    })
  }
  handleChoiceClick(event){
    const n = this.state.answers;
    n[this.state.step] = event.target.getAttribute('data-choicename');
    this.setState({
      step: this.state.step + 1,
      answers: n,
    })
  }
  handleBackToHomeClick(event){
    this.setState({
      step:0,
    });
  }
  evaluateScore(){
    var counter = 0;
    const listOne = Object.values(this.state.answers);
    const listTwo = this.props.questions.map((val,ind)=>val.choice);
    for(var i=0;i<listOne.length;i++){
      if(listOne[i]===listTwo[i]) counter++;
    }
    if(listOne.length) return Math.round(100 * counter / listOne.length);
    else return null;
  }
  render() {
    const st = this.state.step;
    if(st === 0){
      return (
        <StartScreen onChange={this.handleNameChange} onClick={this.handleNameSubmit} name={this.state.name} author={this.props.author}/>  
      );
    }else if(st && st <= Qno){
      return <QuestionScreen onClick={this.handleChoiceClick} question={this.props.questions[st-1].subject} number={st} author={this.props.author}/>
    }else{
      const s = this.evaluateScore();
      return <ResultScreen onClick={this.handleBackToHomeClick} score={s} questions={this.props.questions} answers={this.state.answers} author={this.props.author} player={this.state.name}/>
    }

  }
}

export default HobulhoApp;
