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
  th ,  td{
    border: 1px solid blue;
    width: 158px;
  }
  #sentinela {
    width: 100%;
    height: 5px;
    background-color: red;
  }
`;

export default function Home() {
  const [data, setData] = useState([]);
  const [observer, setObserver] = useState(10)

  const te = Array.from({ length: 50000 }, (v, k) => v = { id: k, name: 'mauro', endereco: 'plinio leite' });

  useEffect(() => {
    console.log(te.filter((item, index) => index <= 10))
  }, [])

  useEffect(() => {
    setData(te.filter((item, index) => index <= observer))
  }, [observer])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('fui observado', entries.some(entry => !entry.isIntersecting))
        setObserver((observer) => observer + 1000);
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
          <th><input type='text' /></th>
          <th><input type='text' /></th>
          <th><input type='text' /></th>
        </tr>
        <tr>
          <th>id</th>
          <th>nome</th>
          <th>endereco</th>
        </tr>



        {data ? data.map((item, index) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.endereco}</td>
              <td><button>teste</button></td>
            </tr>)
        }) : 'vazios'}
        <tr id="sentinela"></tr>


      </table>

      <div>
        teste tamanho array {data.length}
      </div>



    </main>



  )
}