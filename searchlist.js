/*
 * This component diplays the details of the food item when searched by the user and
 * when add to cart button is clicked the details are sent to the addedFoodlist component
 */
import React,{Component} from 'react';
import '../App.css';
class SearchList extends Component{
    render(){
        var count=0;
        if(this.props.foodResults.data!=undefined){
            var foodList=this.props.foodResults.data.map(foodName=>{
                count=count+1;

                return (
                    /*
                     *Displays the searched food name, price and the user can input the quantity
                     */
                    <div className="row list" key={foodName._id}>
                        <div className="col-md-5">
                            <div className="list-group">

                                <div className="list-group-item clearfix">

                                    <div className="profile-teaser-left">
                                        <div className="profile-img"><img src={foodName.picture} alt=""/></div>
                                    </div>
                                    <div className="profile-teaser-main">
                                        <p className="profile-name">{foodName.name}</p>
                                        <p className="profile-name">Price: {foodName.price} LKR</p>
                                        <p className="profile-name">Quantity: <input type="textbox" id="qty"/></p>
                                        <div className="profile-info">
                                            <div className="info">
                                                <button className="btn btn-primary btn-sm col-md-10 px-5" onClick={()=>{this.props.shoppingCart(foodName.name,foodName.price,document.getElementById("qty").value);
                                                        this.props.total(foodName.price);
                                                        this.props.totalQty(document.getElementById("qty").value);
                                                    }}>Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })

            /*
             * If the item searched is not found it will display an error
             */
            if(count==0){
                return (
                    <div className="col-md-5">
                        <h5>Food item not found</h5>
                    </div>
                )
            }
        }

        return(
            <ul>
                {foodList}
            </ul>

        )
    }
}

export default SearchList;