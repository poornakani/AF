import React,{Component} from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import LoginPage from './login';

class CreditCard extends Component{

    constructor(props){
        super(props);
        this.state= {
            name:this.props.name,
            points:this.props.points,
            email:this.props.email,
            discount:0,
            subtot:this.props.total
        }
    }


    home=function(name,cardNumber,cvc,total,points){
        console.log(name +"--"+ cardNumber +"--"+ cvc +"--"+ total);

        var subTotal=parseFloat(this.state.subtot);

        var data={"email":this.state.email,"name":name,"cardNumber":cardNumber,"cvc":cvc,"total":total,"subtotal":subTotal};
        fetch('http://localhost:3001/creditcard/',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
        }).catch(err=>{
            alert("ERRRTT "+err);
        })

        var purchasepoints=parseInt(subTotal*0.001);
        var newPoints=parseInt(this.state.points)-points+purchasepoints;
        var pointdata={"points":newPoints};
        fetch('http://localhost:3001/user/'+this.state.email,{
            method: 'PUT',
            body: JSON.stringify(pointdata),
            headers:{'Content-Type':'application/json'}
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
        }).catch(err=>{
            alert("ERRRTT "+err);
        })


        ReactDOM.render(<App name={this.state.name} points={newPoints} email={this.state.email}/>, document.getElementById('root'));
    }
    logout=function(e){
        ReactDOM.render(<LoginPage/>, document.getElementById('root'));
    }

    Pointdiscount=function(points){
        console.log("Points :" + points);
        var actPoints=parseInt(this.state.points);
        if(points>actPoints){
            alert("Invalid number of points entered");
        }

        else{
            var pointDiscount=points*3;
            var subTot=this.props.total-pointDiscount;
            if(subTot<0){
                alert('SUBTOTAL cannot be negative reduce your cash in points');
            }
            else{
                this.setState({
                    discount:pointDiscount,
                    subtot:subTot
                })
            }
        }

    }


    render(){
        var total=JSON.stringify(this.props.total);
        return(

            <div className="container">
                <div class="progress">
                    <div class="progress-bar bar1" role="progressbar"  aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-success bar2" role="progressbar"  aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-info bar3" role="progressbar"  aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="logout row">
                    <p><b>Hello {this.state.name}</b></p>
                    <button type="button" class="btn btn-secondary" onClick={()=>this.logout()}>Logout</button>
                    <p><b>Loyalty Points:</b> {this.state.points}</p>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <form>
                            <fieldset>
                                <legend>Samapth Bank</legend>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Card Holder's Name</label>
                                    <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" type="text"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Card Number</label>
                                    <input class="form-control" id="cardNumber" placeholder="Card Number" type="text"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">CVC Number</label>
                                    <input class="form-control" id="cvc" aria-describedby="emailHelp" placeholder="CVC" type="text"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Cash In Points</label>
                                    <input class="form-control" id="loyalpoints" aria-describedby="emailHelp" placeholder="Enter Loyalty Points" type="text" onChange={()=>this.Pointdiscount(document.getElementById("loyalpoints").value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1"><b>TOTAL: {this.props.total} LKR</b></label>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1"><b>DISCOUNT: {this.state.discount} LKR</b></label>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1"><b>SUBTOTAL: {this.state.subtot} LKR</b></label>
                                </div>
                                <button type="submit" class="btn btn-primary"  onClick={()=>this.home(document.getElementById("name").value,document.getElementById("cardNumber").value,document.getElementById("cvc").value, total,document.getElementById("loyalpoints").value)}>Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreditCard;