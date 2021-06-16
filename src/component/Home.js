import {Link} from "react-router-dom"


export default function Home() {
    
    return(<>
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div className="home-content">   
                <h1>BiBox MotorCycle</h1>
                <img src="/images/honda-cb-shine.png" className="pb-3"/><br/>
                <Link to="/products" >
                    <button className="btn btn-primary ">Start Assembly</button>
                </Link>
            </div>
        </div>
        
    </>)
}