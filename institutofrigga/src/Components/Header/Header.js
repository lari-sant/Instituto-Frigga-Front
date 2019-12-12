import React, { Component } from 'react';
import MenuSanduiche from '../../assets/img/menu-button-of-three-horizontal-lines.png';
import LogoWeb from '../../assets/img/definitivo-fundo-preto.png';
import LogoMob from '../../assets/img/definitivo-fundo-preto.png';
import {Link, withRouter} from 'react-router-dom';
import { usuarioAutenticado } from '../../services/auth';

class Header extends Component {
    
    logout = () => {
        var exit = window.confirm("Deseja mesmo sair?")

        if(exit === true){

            localStorage.removeItem("usuario-frigga")
            this.props.history.push("/entrar")
            window.alert("Volte sempre!")
        }else{
            
        }
        
    }
    render() {
        return (
            
            <header>
                <div className="logo">
                    <button className="botao-menu" type="menu"><img src={MenuSanduiche}
                        alt="Ícone de Menu" />
                        <p>MENU</p>
                    </button>
                    <img className="logorodapeweb" src={LogoWeb} alt=" Logo  do instituto" />
                    <img className="logohmob" src={LogoMob} alt="logo do instituto" />
                </div>
                <nav>
                    {usuarioAutenticado() ? (
                         <div className="navbar-container">
                         <div className="navbar">
                             <ul className="menu">
                                 <Link to ="/">Home</Link>
                                 <Link to ="/produtos">Produtos</Link>
                                 <Link to ="/receitas">Receitas</Link>
                                 <Link to ="/about">Quem Somos</Link>
                             </ul>
                             <div className="menu2">
                             <Link to ="/perfil">Perfil</Link>
                             <Link style={{
                                 backgroundColor: 'white',
                                 color: 'black' }} onClick={this.logout} >SAIR</Link>
                             </div>
                         </div>
                     </div>
                    ):(
                        <div className="navbar-container">
                        <div className="navbar">
                            <ul className="menu">
                                <Link to ="/">Home</Link>
                                <Link to ="/produtos">Produtos</Link>
                                <Link to ="/receitas">Receitas</Link>
                                <Link to ="/about">Quem Somos</Link>
                            </ul>
                            <div className="menu2">
                            <Link to ="/entrar">Perfil</Link>
                            <Link to ="/entrar">Entrar</Link>
                            </div>
                        </div>
                    </div>
                    )

                    }
                   
                </nav>
            </header>
            
        );
    }
}
export default withRouter(Header);
