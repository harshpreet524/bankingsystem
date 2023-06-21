import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
  
function Converter() {
  
  // Initializing all the state variables 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
   .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  
  
  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));   
    convert();
  }, [info])
    
  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
   
  
  return (
    <ConverterWrapper>
    <div className="App">
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input type="text" 
             placeholder="Enter the amount" 
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
         <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div> 
        <div className="right">
          <h3>To</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}}>Convert</button>
        <h2>Converted Amount:</h2>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
  
      </div>
    </div>
    </ConverterWrapper>
  );
}
  
export default Converter;


// class Converter extends React.Component {

  
//   constructor(props) {
//       super(props);
//       this.state = {
//            currencies: [],
//            from: 'EUR',
//            to: 'USD',
//            result: null,
//            amount: 1
//       };
//   }
//   render() {
//       return (
//         <ConverterWrapper>
//             <div className="wrapper text-center">
//                         <div className="header-wrapper">
//                             <h6 className="header text-white">Currency Converter</h6>
//                         </div>
//                       <form className="form my-5 mx-auto">
//                           <div className="form-group">
//                               <span className="from text-white">From</span>
//                               <span className="to text-white">To</span>
//                           </div>
//                           <div className="form-group">
//                               <label for="amount" className="amount text-white">Amount</label>
//                               <input
//                                   id="amount"
//                                   class="form-control"
//                                   type="number"
//                                   name="amount"
//                                   value={this.state.amount}
//                                 />
//                           </div>
//                       </form>
//                       <h3 className="result">0</h3>
//                       <button className="btn-lg btn-primary btn-convert mb-5">Convert</button>
//               </div>
//         </ConverterWrapper>
//       );
//   }
// }

const ConverterWrapper = styled.div`
margin-left: 2rem;
width: 70rem;
height: auto;
background-color: #3a4149;
border: 1px solid #000;

.heading{
font-family: 'Pacifico', cursive;
font-size: 35px;
}
.container{
height: 300px;
width: 800px;
display: flex;
justify-content: space-around;
align-items: center;
}
input{
padding-left: 5px;
font-size: 20px;
height: 36px;
}
.middle,.right{
width: 120px;
}
.switch{
padding: 5px;
margin-top: 25px;
background-color: rgb(226, 252, 184);
border-radius: 50%;
cursor: pointer;
}
.result{
box-sizing: border-box;
width: 800px;
padding-left: 30px;
}
button{
width: 100px;
height: 30px;
font-weight: bold;
font-size: 20px;
border: 2px solid forestgreen;
background-color: rgb(226, 252, 184);
cursor: pointer;
}
p,h3, button, .switch{
color: forestgreen;
}
p{
font-size: 30px;
}
`;

// export default Converter;
