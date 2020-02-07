import React, {Component} from 'react';

import Pesto from '../Pesto/Pesto'

class Pestos extends Component {

    constructor(props) {
        super(props);
        this.state = {array_pestos:[]}
    }

    xhr = new XMLHttpRequest();

    assignPestos = () => {
        // console.log(this.xhr.responseText);
        this.setState({array_pestos: (JSON.parse(this.xhr.responseText).pestos).split(';')})
    }

    getPestos(name){
        this.xhr.onload = this.assignPestos;
        this.xhr.open("GET", "http://localhost:2000?name=" + name, true);
        this.xhr.send(); 
    }

    componentDidMount(){
        let pestos = this.getPestos(this.props.name);
    }

    render() {
        return (

                this.state.array_pestos.map((pesto, index) => (
                    <Pesto key = {index} text = {pesto} />
                ))
        );				
    }

}

export default Pestos;