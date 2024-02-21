import Square from "../components/Square"
import "../App.css"

const renderForm = [[1,2,3],[4,5,6],[7,8,9]]

export default function Home(){
    return(
        <>
            <div className="main-div">
        <div>
        <div className="move-detection">
            <div className="left">Kamu</div>
            <div className="right">Lawan</div>
          </div>
          <div>
            <h1 className="tittle-head transparant-div" >Tic X Tac O Toe</h1>
            <div className="square-wrap">
              {
                renderForm.map((x)=>
                x.map((a)=>{
                  return <Square/>
                }))
              }
            </div>
        </div>
        </div>
        
      </div>
        </>
    )
}