
export default function FinalAssembly(props) {
    
    // console.log(props.location.state)
    const products = props.location.state.products

    const renderData = !products?null:products.map((product)=>{
        return(<div key={product.id} className="col-md-4 col-6 col-3">
            <div className="card card-block m-4"  >
                <img src={product.url} className="card-img-top p-3" alt="Not Found!!" height="250"/>
            </div>
        </div>)
    })

    return(<>
        <h1>Final Assemble Product</h1>
        <div className="row m-4 pb-4 pt-2">
            {renderData}
        </div>
    </>)
}