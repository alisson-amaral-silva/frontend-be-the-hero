import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../services/api';

import './styles.css';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try{
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            alert(`ID DO INCIDENTE: ${response.data.id}`);
            history.push('/profile')
        }catch(e){
            alert(`BO NO CADASTRO DO INCIDENTE` );
        }

    }

    return(
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="be the hero"/>
                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#e00241"/>
                            Voltar para home
                        </Link>
                    </section>
                    <form onSubmit={handleRegister}>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do caso" type="text"/>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}  placeholder="Descrição"/>
                        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>
                        <button className="button"> Cadastrar</button>
                    </form>
                </div>
            </div>
        );
}