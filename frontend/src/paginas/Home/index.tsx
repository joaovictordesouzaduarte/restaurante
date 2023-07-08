import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../componentes/Banner";
import NavBar from "../../componentes/NavBar";
import Rodape from "../../componentes/Rodape";
import estilos from "./Home.module.scss";
import { Stack, Typography } from "@mui/material";

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <Stack direction="row" className={estilos.MiniBanners}>
        <img src="/imagens/cozinhar_01.jpg" alt="Um prato conceitual" />
        <Stack className={estilos.CardCentral}>
          <Typography variant="h4">A melhor rede de restaurantes!</Typography>
          <Stack>
            <Typography paragraph>seja um parceiro agora:</Typography>
            <Typography paragraph>
              ligue para <a href="callto:99999999999">(99) 99999-999</a>
            </Typography>
          </Stack>
        </Stack>
        <img src="/imagens/cozinhar_02.jpg" alt="Um hambúrguer desconstruído" />
      </Stack>
      <Stack direction="row" className={estilos.Categorias}>
        <Stack className={estilos.TipoDePrato}>
          <Link to="#">
            <img src="/imagens/cafedamanha.png" alt="Café da manhã" />
          </Link>
          <Typography variant="h4">Café da manhã</Typography>
        </Stack>
        <Stack className={estilos.TipoDePrato}>
          <Link to="#">
            <img src="/imagens/almoco.png" alt="Almoço" />
          </Link>
          <Typography variant="h4">Almoço</Typography>
        </Stack>
        <Stack className={estilos.TipoDePrato}>
          <Link to="#">
            <img src="/imagens/jantar.png" alt="Jantar" />
          </Link>
          <Typography variant="h4">Jantar</Typography>
        </Stack>
        <Stack className={estilos.TipoDePrato}>
          <Link to="#">
            <img src="/imagens/sobremesa.png" alt="Sobremesas" />
          </Link>
          <Typography variant="h4">Sobremesas</Typography>
        </Stack>
      </Stack>
      <Stack className={estilos.Links}>
        <h3>Conheça os melhores restaurantes</h3>
        <Typography>
          Clique <Link to="/restaurantes">aqui</Link>
        </Typography>
      </Stack>
      <Rodape />
    </>
  );
}

export default App;
