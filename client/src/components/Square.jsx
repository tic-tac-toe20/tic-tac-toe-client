import "../App.css"

export default function Square({handlerClick, value, click}) {
    console.log(value, "value di square");
    console.log(click, "click di square");
    return(
        <div className="square" onClick={()=>handlerClick(value)}>
            <p>{click[value]==value ? '' : click[value]}</p>
        </div>
    )
}