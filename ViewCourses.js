import React,{Component} from 'react';
import axios from 'axios/index'

const Course = (props)=>(
    <tr>
        <td>{props.course.Name}</td>
        <td>{props.course.Course}</td>
        <td>{props.course.PassMark}</td>
        <td>{props.course.LecturerInCharge}</td>
        <td><button className="btn btn-primary" onClick={()=>CourseView.buttonClick(props.course.Subjects)}>Subject</button></td>
        <td><button className="btn btn-primary" onClick={()=>CourseView.TotalCalculation(props.course._id)}>Calculate</button></td>
    </tr>
);

export default class CourseView extends Component{

    constructor(props){
        super(props);
        this.state = {
            Courses:[]
        }
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:4000/course').then((res)=>{
            this.setState({Courses:res.data});
        })
    }

    listelements(){
        return this.state.Courses.map((course,i)=>{
            return <Course course = {course} key={i}/>
        })
    }

    render() {
        return(
            <div>
                <table border="2px" align="center" style={{marginTop:100}}>
                    <tr>
                    <th>Name</th>
                    <th>Course</th>
                    <th>PassMark</th>
                    <th>Lecturer in charge</th>
                    <th>Subjects</th>
                        <th>Total</th>
                    </tr>
                    <tbody>
                    {this.listelements()}
                    </tbody>
                </table>
            </div>
        )
    }

    static TotalCalculation(id){
        axios.get('http://127.0.0.1:8080/total/'+id).then((res)=>{
            let total = (res.data.total);
            let subCount = (res.data.subjects.length);
            alert('You have to complete '+subCount+" subjects, Which will be Rs."+total+"/= in total.");
        })
    }

    static buttonClick(Subjects) {
        let data="";
        console.log(Subjects);
        for(let i=0;i<Subjects.length;i++){
            axios.get('http://127.0.0.1:4000/subject/'+Subjects[i]).then((res)=>{
                data = "Name: "+res.data.Name+", Description: "+res.data.Description+", Amount: "+res.data.Amount;
                data = data+'\n';
                alert(data);
            });

        }

    }

}