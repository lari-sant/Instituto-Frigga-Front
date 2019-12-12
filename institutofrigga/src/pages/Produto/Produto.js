import React, { Component } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import api from '../../services/api'
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { usuarioAutenticado } from '../../services/auth';



class Produto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listarCategoriaProduto: [],
            listarOferta: [],
            listarProduto: [],
            listarUsuario: [],
            Preco: [],
            modalOferta: {
                usuario : {
                    nome : "",
                    telefone: ""
                }
            },
            open: false
        }
    }

    onOpenModal = (oferta) => {
        this.setState({ open: true, modalOferta: oferta });
        
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        this.getOferta();
        this.getProduto();
    }

    getOferta = () => {
        
        api.get('/oferta').then(response => {
            if (response.status === 200) {
                this.setState({ listarOferta: response.data })
                console.log(response.data)
            }
        })
    }
    getProduto = () => {
        api.get('/produto').then(response => {
            if (response.status === 200) {
                this.setState({ listarCategoriaReceita: response.data })
            }
        })
    }

    render() {
        const { open } = this.state;
        return (

            <div>
                <Header />
                <main>
                    <section className="container_geral">
                        <section className="container-categorias">
                            <h2>CATEGORIAS</h2>
                            <div className="bar_bar"></div>
                            <div className="categorias">
                                <div className="align">
                                    <p>LEGUMES</p><br></br>
                                    <div className="categ_1">
                                    <Link to = '#'></Link>
                                    </div>
                                </div>
                                <div className="align">
                                    <p>FRUTAS</p><br></br>
                                    <div className="categ_2">
                                    <Link to = '#'></Link>
                                    </div>
                                </div>
                                <div className="align">
                                    <p>SAFRA DA SEMANA</p><br></br>
                                    <div className="categ_3">
                                    <Link to = '#'></Link>
                                    </div>
                                </div>
                                <div className="align">
                                    <p>MAIS BUSCADOS</p><br></br>
                                    <div className="categ_4">
                                    <Link to = '#'></Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="container_mobile">
                            <div className="categorias_mobile">
                                <div className="categ_mobile">
                                    <p>LEGUMES</p>
                                    <Link to = '#'><img src="IMGS/frutas.png" title="#" alt="legumes" /></Link>
                                </div>
                                <div className="categ_mobile">
                                    <p>FRUTAS</p>
                                    <Link to = '#'><img src="IMGS/abacaxi.png" title="#" alt="frutas" /></Link>
                                </div>
                            </div>
                        </section>
                        <section className="container-produtos container-produtos-isa">
                            <h3 className="isa-produtos">Produtos</h3>

                            {
                                this.state.listarOferta.map(function (of) {
                                    return (
                                        <div key={of.ofertaId} className="card_produtoisa">
                                            <img src={"http://localhost:5000/Arquivos/" + of.imagemProduto} alt={of.tipo} />
                                            <div className="nav-p nav-p-isa">

                                                <p>{of.produto.tipo}<br></br> R$ {of.preco}</p>
                                                {
                                                   usuarioAutenticado()? (
                                                    <Link onClick={() => this.onOpenModal(of)}>Reservar</Link>
                                                   ):(
                                                    <Link to="/Entrar">Reservar</Link>
                                                   ) 
                                                }
                                               
                                            </div>
                                        </div>
                                    );
                                }.bind(this))
                            }
                            {

                                <div>
                                    <Modal open={open} onClose={this.onCloseModal} center>

                                                        <div className="containerModalProduto">
                                                            <div className="imgModalProduto">
                                                                <img src={"http://localhost:5000/Arquivos/" + this.state.modalOferta.imagemProduto} alt={this.state.modalOferta.tipo} />
                                                            </div>
                                                            <div>
                                                                <h1>{this.state.modalOferta.tipo}</h1>
                                                                <h2>Dados do produtor para contato</h2>
                                                               
                                                                            <div>
                                                                            <p>Nome:{this.state.modalOferta.usuario.nome}</p>
                                                                            
                                                                            <p>Telefone:{this.state.modalOferta.usuario.telefone}</p>
                                                                            </div>                
                                                                <p>R$: {this.state.modalOferta.preco}</p>
                                                            </div>
                                                            
                                                    </div>                      
                                    </Modal>
                                </div>
                            }
                              
                           
                           
                        </section>
                    </section>>
                </main>
                <Footer />
            </div>
        );
    }
}
export default Produto;