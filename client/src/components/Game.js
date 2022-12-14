import './Game.css'
import {useState} from 'react'

const Game = () => {
  const [turn,setTurn]= useState('X');
  const [cells,setCells]= useState(Array(9).fill(' '))
  const [winner,setWinner]= useState();
  const [gameOver,setGameOver]= useState(true)

  const handleRestart = () =>{
    setWinner(null);
    setCells(Array(9).fill(' '));
  }

  const checkWinner = (squares) =>{
    let combos ={
      across:[
        [0,1,2],
        [3,4,5],
        [6,7,8]

      ],
      down:[
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
      diagonal:[
        [0,4,8],
        [2,4,6]
      ]
    }

    for (let combo in combos){
      combos[combo].forEach(patterns=> {
        if(squares[patterns[0]]=== ' '|| squares[patterns[1]] === ' '|| squares[patterns[2]]=== ' ')
        {

        } else if( squares[patterns[0]]===squares[patterns[1]] && squares[patterns[1]]===squares[patterns[2]]){
          setWinner(squares[patterns[0]])
          
        }
      }
      ) 
    }
  }
  const handleClick = (num) =>{
    if(cells[num] !== ' ')
    {
      alert("already clicked!!")
      return;
    }
    let squares = [...cells];

    if(turn ==='X')
    {
      squares[num]= 'X'
      setTurn('O')
    }
    else{
      squares[num]= 'O'
      setTurn('X')
    }
    checkWinner(squares)
    setCells(squares)
    console.log(squares)
  }
  const Cell = ({num}) =>
  {
    return(
        <td onClick={()=>handleClick(num)}>{cells[num]}</td>
    );
  }

  
  return ( 
    <div className='container'>
      <table>
      Turn: {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {
      winner &&(
        <>
        <p>{winner} wins!!</p>
        <button onClick={()=>handleRestart()}>Play again</button>
        </>
      )}
    </div>
   );
}
 
export default Game;