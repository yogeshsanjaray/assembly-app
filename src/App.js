import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import Home from './component/Home';
import Products from './component/Products';
import Assembly from './component/Assembly';
import FinalAssembly from './component/FinalAssembly';

function App() {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  
  // console.log(select)
  return (
    <div className="App container">

      <Router>
        <Switch>
          <Route
            path="/" 
            exact
            component={Home}
          />
          
          <Route exact path="/products" render={(props) => (
              <Products 
                {...props}
                data={data} 
                setData={setData} 
                select={select} 
                setSelect={setSelect} 
              />)} 
          />

          <Route exact path="/assembly" render={(props) => (
              <Assembly 
                {...props}
                select={select} 
                setSelect={setSelect} 
              />)} 
          />
          <Route exact path="/finalassembly" component={FinalAssembly} />


        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;
