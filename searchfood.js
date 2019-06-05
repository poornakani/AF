import React,{Component} from 'react';
import '../App.css';

class SearchFood extends Component{

    getItem(e){
        e.preventDefault();
        const foodname=this.refs.foodname.value;
        const update = this.props;
        var data={"foodname":foodname};
        console.log(data.foodname);
        fetch('http://localhost:3001/food/'+data.foodname,{
            method: 'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response=>{
            return response.json();
        }).then(data=>{
            update.callUpdate(data);
        }).catch(err=>{
            alert(err);
        })

    }


    render(){
        /*
         *Search food item bar
         */
        return(
            <form>

                <fieldset>
                    <div className="col-md-10">
                        <legend>Search Food Item</legend>
                        <div className="form-group">
                            <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Food Item" ref="foodname"/>
                        </div>
                    </div>

                    <div className="col-md-10 search">
                        <button className="btn btn-primary " onClick={this.getItem.bind(this)}>Search</button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default SearchFood;
