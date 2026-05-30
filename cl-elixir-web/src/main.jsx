import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import './style.css';

const WHATSAPP = '526671234567'; // CAMBIA este número por el tuyo con lada. Ejemplo: 526671234567
const INSTAGRAM = 'clelixir.scents';

const perfumes = [
  ['YVES SAINT LAURENT Y EDP','Hombre','Fresco / elegante',130,230,430],
  ['YVES SAINT LAURENT Y EDT','Hombre','Fresco / versátil',120,210,380],
  ['Rasasi Hawas For Him','Hombre','Fresco / dulce',75,135,250],
  ['Rasasi Hawas Ice','Hombre','Fresco / potente',80,140,260],
  ['Hawas Tropical','Hombre','Tropical / fresco',90,140,260],
  ['Hawas Verde','Hombre','Verde / fresco',90,140,260],
  ['Hawas Kobra','Hombre','Dulce / intenso',90,140,270],
  ['Hawas Malibu','Hombre','Tropical / playero',90,140,260],
  ['Afnan 9 PM EDP','Hombre','Dulce / nocturno',75,130,240],
  ['Afnan 9AM','Hombre','Fresco / diario',75,125,230],
  ['JPG Paradise Garden','Hombre','Verde / tropical',170,270,500],
  ['Nitro Red','Hombre','Dulce / energético',80,135,250],
  ['Lattafa Khamrah','Hombre','Dulce / especiado',75,130,240],
  ['Rayhaan Elixir','Hombre','Dulce / seductor',90,135,250],
  ['Prada Luna Rossa Ocean','Hombre','Limpio / elegante',120,200,380],
  ['Spicebomb EDT','Hombre','Especiado / masculino',100,170,320],
  ['Versace Eros Flame EDP','Hombre','Cítrico / cálido',100,175,330],
  ['Valentino Coral Fantasy EDT','Hombre','Dulce / moderno',130,225,420],
  ['Orientica XO Xclusif Oud Bleu','Hombre','Azul / elegante',80,135,250],
  ['Acqua Di Gio Profondo EDP','Hombre','Acuático / fresco',140,225,420],
  ['Xerjoff Naxos','Hombre','Miel / tabaco / premium',250,360,680],
  ['Montblanc Explorer EDP','Hombre','Amaderado / versátil',90,145,270],
  ['Art of Universe','Hombre','Fresco / moderno',80,135,250],
  ['Odyssey Aqua','Hombre','Acuático / fresco',80,180,350],
  ['Hawas Pink','Mujer','Dulce / femenino',90,160,300],
  ['Barakkat Rouge 540','Mujer','Dulce / elegante',70,110,200],
  ['Club de Nuit Woman EDP','Mujer','Floral / elegante',75,130,240],
  ['Libre EDP','Mujer','Floral / sofisticado',140,220,400],
  ['Yum Yum','Mujer','Dulce / juvenil',90,150,280],
  ['Yara','Mujer','Dulce / cremoso',75,120,230],
  ['Valentino Donna Born In Roma','Mujer','Floral / premium',150,250,450],
  ['Ferragamo Amo Per Lei','Mujer','Floral / limpio',90,150,280],
  ['Lancôme La Vie Est Belle EDP','Mujer','Dulce / elegante',120,200,380]
].map(([nombre,genero,tipo,p3,p5,p10]) => ({nombre,genero,tipo,p3,p5,p10}));

const combos = [
  ['Combo Calor Extremo 1','Hawas Ice 5ml + Acqua Di Gio Profondo 5ml + Odyssey Aqua 5ml',489],
  ['Combo Calor Extremo 2','Hawas Tropical 5ml + Nitro Red 5ml + Hawas Malibu 5ml',379],
  ['Combo Citas del Día 1','JPG Paradise Garden 5ml + YSL Y EDP 5ml + Hawas Malibu 5ml',579],
  ['Combo 3 Escenarios 1','Hawas Ice 5ml + YSL Y EDP 5ml + Rayhaan Elixir 5ml',459],
  ['Combo Feminidad Total','Hawas Pink 10ml + Libre EDP 5ml + Valentino Donna 3ml',599],
  ['Combo Dulce Encanto','Yara 10ml + Yum Yum 5ml + La Vie Est Belle 3ml',449]
].map(([nombre,detalle,precio]) => ({nombre,detalle,precio}));

function waLink(texto){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`; }

function App(){
  const [busqueda,setBusqueda] = useState('');
  const [genero,setGenero] = useState('Todos');
  const filtrados = useMemo(() => perfumes.filter(p =>
    (genero === 'Todos' || p.genero === genero) &&
    `${p.nombre} ${p.tipo}`.toLowerCase().includes(busqueda.toLowerCase())
  ), [busqueda,genero]);

  return <div className="page">
    <header className="hero">
      <div className="badge"><Sparkles size={16}/> Catálogo oficial de decants</div>
      <h1>CL ELIXIR</h1>
      <p>Fragancias seleccionadas en presentaciones de 3ml, 5ml y 10ml. Prueba, enamórate y elige tu aroma ideal.</p>
      <div className="actions">
        <a className="btn primary" href={waLink('Hola CL ELIXIR, quiero informes de un decant')} target="_blank"><MessageCircle size={18}/> Pedir por WhatsApp</a>
        <a className="btn secondary" href={`https://instagram.com/${INSTAGRAM}`} target="_blank"><Instagram size={18}/> @{INSTAGRAM}</a>
      </div>
    </header>

    <main>
      <section className="filters">
        <div className="search"><Search size={18}/><input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar perfume o tipo de aroma..." /></div>
        <div className="tabs">{['Todos','Hombre','Mujer'].map(g => <button key={g} onClick={()=>setGenero(g)} className={genero===g?'active':''}>{g}</button>)}</div>
      </section>

      <h2>Decants disponibles</h2>
      <section className="grid">
        {filtrados.map(p => <article className="card" key={p.nombre}>
          <div className="top"><div><h3>{p.nombre}</h3><p>{p.tipo}</p></div><span>{p.genero}</span></div>
          <div className="prices"><div><small>3ml</small><b>${p.p3}</b></div><div><small>5ml</small><b>${p.p5}</b></div><div><small>10ml</small><b>${p.p10}</b></div></div>
          <a className="quote" href={waLink(`Hola CL ELIXIR, me interesa el decant de ${p.nombre}`)} target="_blank">Cotizar / Apartar</a>
        </article>)}
      </section>

      <h2>Combos recomendados</h2>
      <section className="grid combos">
        {combos.map(c => <article className="card combo" key={c.nombre}>
          <h3>{c.nombre}</h3><p>{c.detalle}</p><strong>${c.precio} MXN</strong>
          <a className="quote" href={waLink(`Hola CL ELIXIR, me interesa el ${c.nombre}`)} target="_blank">Pedir combo</a>
        </article>)}
      </section>
    </main>

    <footer>CL ELIXIR · Decants premium · Culiacán, Sinaloa<br/><span>@{INSTAGRAM}</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
