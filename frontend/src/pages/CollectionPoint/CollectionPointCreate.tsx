import React, { useState, useRef, useMemo, useEffect } from 'react'
import axiosInstance from '../../helper/axios-instance'
import { useNavigate } from 'react-router-dom'
import MapComponent from '../../map/MapComponent'
import './CollectionPointCreate.css'
import axios from 'axios'
import L from 'leaflet'

const CollectionPointCreate: React.FC = () => {
  const [cep, setCep] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState({ nome: '', descricao: '' })
  const [popupCoords, setPopupCoords] = useState<{ lat: number; lng: number } | null>(null)
  const navigate = useNavigate()
  const mapRef = useRef<L.Map | null>(null)

  const handleCepBlur = async () => {
    // if (cep.length !== 8) {
    //   alert('Digite um CEP válido com 8 dígitos.')
    //   return
    // }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data
      if (data.erro) {
        alert('CEP não encontrado. Verifique e tente novamente.')
        return
      }
      setEstado(data.uf || '')
      setCidade(data.localidade || '')
      setBairro(data.bairro || '')
      setRua(data.logradouro || '')
    } catch {
      alert('Erro ao buscar o CEP. Verifique sua conexão e tente novamente.')
    }
  }

  const handleSearch = async () => {
    if (!rua.trim() || !cidade.trim() || !estado.trim()) {
      alert('Preencha Rua, Cidade e Estado antes de buscar localização.')
      return
    }
    const address = `${rua}, ${cidade}, ${estado}`
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      if (response.data.length === 0) {
        alert('Endereço não encontrado. Verifique os campos e tente novamente.')
        return
      }
      const { lat, lon } = response.data[0]
      const latNum = parseFloat(lat)
      const lonNum = parseFloat(lon)
      setLatitude(latNum)
      setLongitude(lonNum)
      if (mapRef.current) mapRef.current.setView([latNum, lonNum], 18)
    } catch {
      alert('Erro ao buscar o endereço. Verifique sua conexão e tente novamente.')
    }
  }

  const isPointInBrazil = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      return response.data.address?.country === 'Brasil'
    } catch {
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!cep || !estado || !cidade || !bairro || !rua || !numero) {
      alert('Preencha todos os campos obrigatórios antes de enviar.')
      return
    }
    if (latitude === null || longitude === null) {
      alert('Defina a localização no mapa antes de enviar.')
      return
    }
    const pointData = { Cep: cep, Estado: estado, Cidade: cidade, Bairro: bairro, Rua: rua, Numero: numero, Latitude: latitude, Longitude: longitude }
    try {
      await axiosInstance.post('/CollectionPoint', pointData)
      navigate('/collection-points')
    } catch {
      alert('Erro ao criar ponto de coleta. Verifique os dados e tente novamente.')
    }
  }

  const handleAddPoint = async () => {
    if (!popupData.nome.trim() || !popupData.descricao.trim() || !popupCoords) {
      alert('Preencha todos os campos antes de adicionar o ponto.')
      return
    }
    const enderecoCompleto = `${cep}, ${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}`
    try {
      await axiosInstance.post('/CollectionPoint', { nome: popupData.nome, descricao: popupData.descricao, endereco: enderecoCompleto, latitude: popupCoords.lat, longitude: popupCoords.lng })
      if (mapRef.current) {
        L.marker([popupCoords.lat, popupCoords.lng], { icon: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41], iconAnchor: [12, 41] }) })
          .addTo(mapRef.current)
          .bindPopup(`<b>${popupData.nome}</b><br>${popupData.descricao}`)
          .openPopup()
      }
      setPopupData({ nome: '', descricao: '' })
      setShowPopup(false)
      alert('Ponto de coleta criado com sucesso!')
    } catch {
      alert('Erro ao criar ponto de coleta. Verifique os dados e tente novamente.')
    }
  }

  const fetchCollectionPoints = async () => {
    try {
      const response = await axiosInstance.get('/CollectionPoint')
      const points = response.data?.data ?? response.data
      if (mapRef.current) {
        points.forEach((point: any) => {
          L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41], iconAnchor: [12, 41] }) })
            .addTo(mapRef.current!)
            .bindPopup(`<b>${point.nome}</b><br>${point.descricao}`)
        })
      }
    } catch {
      alert('Erro ao carregar os pontos de coleta. Tente novamente mais tarde.')
    }
  }

  useEffect(() => { fetchCollectionPoints() }, [])

  const memoizedMapComponent = useMemo(
    () => (
      <MapComponent
        onMapClick={async (lat, lng, event) => {
          if (!(await isPointInBrazil(lat, lng))) {
            alert('O ponto deve estar localizado no Brasil.')
            return
          }
          if (event.originalEvent.ctrlKey) {
            setPopupCoords({ lat, lng })
            setShowPopup(true)
          } else {
            setLatitude(lat)
            setLongitude(lng)
          }
        }}
        mapRef={mapRef}
      />
    ), []
  )

  return (
    <div className="collection-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="formulario">
          
            <label className="form-label">CEP:</label>
            <input type="text" placeholder="Ex: 27515000" value={cep} onChange={e => setCep(e.target.value)} onBlur={handleCepBlur} required />
         
            <label className="form-label">Estado:</label>
            <input type="text" className="form-control" placeholder="Ex: SP" value={estado} onChange={e => setEstado(e.target.value)} required />
            <label className="form-label">Cidade:</label>
            <input type="text" className="form-control" placeholder="Ex: São Paulo" value={cidade} onChange={e => setCidade(e.target.value)} required />
            <label className="form-label">Rua:</label>
            <input type="text" className="form-control" placeholder="Ex: Avenida Paulista" value={rua} onChange={e => setRua(e.target.value)} required />
            <label className="form-label">Bairro:</label>
            <input type="text" className="form-control" placeholder="Ex: Alegria" value={bairro} onChange={e => setBairro(e.target.value)} required />
            <label className="form-label">Número:</label>
            <input type="text" className="form-control" placeholder="Ex: 1000" value={numero} onChange={e => setNumero(e.target.value)} />
            <p>(Ctrl + botão esquerdo para adicionar ponto)</p>
            <button type="button" className="btn-pesquisar" onClick={handleSearch}>Pesquisar</button>
            <button type="button" className="btn-gerenciar" onClick={() => navigate('/collection-points')}>Gerenciar Pontos de Coleta</button>
        </form>
      </div>
      <div className="map-container">{memoizedMapComponent}</div>
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-form" onClick={e => e.stopPropagation()}>
            <h3>Adicionar Ponto</h3>
            <div className="mb-3">
              <label>Nome:</label>
              <input type="text" className="label-popup" value={popupData.nome} onChange={e => setPopupData({ ...popupData, nome: e.target.value })} />
            </div>
            <div className="mb-3">
              <label>Descrição:</label>
              <input type="text" className="label-popup" value={popupData.descricao} onChange={e => setPopupData({ ...popupData, descricao: e.target.value })} />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => setShowPopup(false)}>Cancelar</button>
              <button className="btn btn-success" onClick={handleAddPoint}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionPointCreate
