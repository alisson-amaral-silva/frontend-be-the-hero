import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../services/api';
import './styles.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('name');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profiles', {
            headers:{
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter((x) => x.id !== id));
        }catch(e){
            alert('erro ao deletar o incidente, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02048">
                    </FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                                    <li key={incident.id}>
                                    <strong>CASO:</strong>
                                    <p>{incident.title}</p>
                                    <strong>DESCRIÇÃO:</strong>
                                    <p>{incident.description}</p>
                                    <strong>VALOR:</strong>
                                    {/* função js para trocar de formatação de moeda<!--> */}
                                    <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                                    <button type="button">
                                        <FiTrash2 size={20} onClick={ () => handleDeleteIncident(incident.id)} color="#a8a8b3"></FiTrash2>
                                    </button>
                                </li>
                ))}
                
            </ul>
        </div>
    );
}