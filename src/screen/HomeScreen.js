import React from 'react';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            time :new Date(),
        }
    }

   componentDidMount(){
    this.timeid = setInterval(() => this.setState({
        time: new Date()
    }),1000);
    
   }

  

    render(){
        return(
            <div>
                {this.state.time.toLocaleTimeString()}
            </div>
        )
    }

    
   
}

export default HomeScreen;