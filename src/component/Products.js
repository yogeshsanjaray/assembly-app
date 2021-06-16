import {useEffect} from 'react';
import MOCK_DATA from "../assets/MOCK_DATA.json"
import {Link} from "react-router-dom"


export default function Products(props) {
    const {data,setData,select,setSelect} = props;

    useEffect(()=>{
        setData(MOCK_DATA.products)
    },[])
    
    const statusUpdate = (id) =>{
        setData(data.filter((product)=>{
            if(product.id === id){
                product.complete = !product.complete;
            }
            return product
        }))
    }

    useEffect(()=>{
        setSelect(data.filter((product)=>{
            if(product.complete){
                return product
            }
        }))
    },[data])
    

    const renderData = !data?null:data.map((product)=>{
            return(<div key={product.id} className="col-md-4 col-6">
                <div className={"card card-block "+ (product.complete?"card_1":'')} onClick={()=>{statusUpdate(product.id)}} >
                    <img src={product.url} className="card-img-top p-3" alt="Not Found!!" height="250"/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                    </div>
                </div>
            </div>)
        })

    return(<>
        <div className="container-fluid">
            <h1 className="mt-5">Select Parts to Assemble</h1>
            <p className="subtitle">Click to select and deselect </p>
            <div className="overflow-auto row flex-row flex-nowrap mt-4 pb-4 pt-2">
                {renderData}
            </div>
        </div>
        <div>
            <Link to="/assembly" >
                <button className="btn btn-primary btn-lg mt-5">Start Assembly</button>
            </Link>
        </div>
    </>)
}