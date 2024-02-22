import "../App.css"

export default function Square({handlerClick, value, click}) {
    return(
        <div className="square" onClick={()=>handlerClick(value)}>
            <p>{click[value]==value ? '' : click[value]}</p>
        </div>
    )
}