import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css';

class DeletarUsuario extends Component{
    constructor(props){
        super(props);

        this.state = {
            usuario: {},
            redirect: false
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        fetch(`http://localhost:3003/sistema/usuarios/${id}`)
        .then(data => {
            data.json().then(data => {
                this.setState({usuario: data});
            })
        })

    }


    render (){
        const {redirect} = this.state;

        if (redirect){
            return <Redirect to="/usuarios"/>;
        }else{
            return(
                <fieldset>
                    <legend> Deletar Usuário</legend>
                    <div className="usuario-delete">
                        <label htmlFor="nome">{this.state.usuario.nome}</label>
                        <p>Tem certeza que deseja deletar este registro?</p>

                        <button onClick={this.handleClick}>Remover</button>
                        <br /><br />

                        <Link to={"/usuarios"}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;
        fetch(`http://localhost:3003/sistema/usuarios/${id}`,{
            method: "delete"
        })
        .then(data =>{
            if (data.ok){
                this.setState({redirect: true})
            }
        })

        event.preventDefault();
    };    

} 

export default DeletarUsuario;

