import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi'
import api from '../services/api';
import './styles.css'

export default function Logon(){
    const [id, setId]= useState("");
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();

        const data ={
            id
        };

        try{
            const response = await api.post('session', data);
            localStorage.setItem('ongId', id);
            localStorage.setItem('name', response.data.name);

            history.push('/profile');

        }catch(e){
            alert(`BO NO LOGIN` );
        }

    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                           value={id}
                           onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e00241"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}