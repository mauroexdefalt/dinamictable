import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
  main {
    display: flex;
    flex-direction: row;

  }
  table{
    
    max-height:200px;
    overflow: scroll;
    padding: 0;
    background-color: #fff;
   
  }
  li {
    height: 15px;
    padding: 15px;
  }
  li img {
    --size: 75px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
  li div {
    padding: 15px;
    background-color: #fff;
    height: calc(100% - 30px);
  }
  th , td{
    border: 1px solid blue;
    width: 158px;
  }
  #sentinela {
    width: 100%;
    height: 5px;
    background-color: red;
  }
`;

export default function Home({ dataTable, colums }) {
  const [data, setData] = useState();
  const [observer, setObserver] = useState(10)
  const [filter, setFilter] = useState({})

  //const te = Array.from({ length: 50000 }, (v, k) => v = { id: k, name: 'mauro', endereco: 'plinio leite' });
  const te = dataTable


  function onchange(i) {
    const { name, value } = i.target;
    console.log(name, value)
    if(name ==  'name'){
      var arrAtt = te.filter((item, index) => item.name.english.includes(value))
    }else{
      var arrAtt = te.filter((item, index) => item.base[name].toString().includes(value))
    }

    

    console.log('art att',arrAtt)
    setData(arrAtt.splice())
  }


  useEffect(() => {
    console.log('dados props', colums, dataTable)
    //console.log(te.filter((item, index) => index <= 10))
  }, [])

  useEffect(() => {
    setData(te.filter((item, index) => index <= observer))
  }, [observer])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('fui observado', entries.some(entry => !entry.isIntersecting))
        setObserver((observer) => observer + 50);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <main>
      <GlobalStyle />
      <table>
        <tr>
          {
            colums ? colums.map((item) => {
              return (
                <th><input type='text' name={item} onChange={onchange} /></th>
              )
            }
            ) : 'Filtros não encontradas'
          }
        </tr>
        <tr>
          {
            colums ? colums.map((item) => {
              return (
                <th>{item}</th>
              )
            }
            ) : 'Filtros não encontradas'
          }
        </tr>




        {data ? data.map((item, index) => {

          return (

            <tr>
              <td>Sprite</td>
              <td>{item.name.english}</td>
              <td>{item.base['HP']}</td>
              <td>{item.base['Attack']}</td>
              <td>{item.base['Defense']}</td>
              <td>{item.base['Sp. Attack']}</td>
              <td>{item.base['Sp. Defense']}</td>
              <td>{item.base['Speed']}</td>
              <td>{item.type[0]}</td>
            </tr>

          )
        }) : 'vazios'}

        <tr id="sentinela"></tr>
      </table>

    </main>



  )
}