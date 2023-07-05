import axios from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface ListaRestaurantesProps {}
const ListaRestaurantes = (props: ListaRestaurantesProps) => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  // const classes = useStyles(props);

  const carregarDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    carregarDados(
      `http://localhost:8000/api/v1/restaurantes/?search=${busca}&ordering=${ordenacao}`
    );
  };
  useEffect(() => {
    // obter restaurantes
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <Typography variant="h5" component="h2">
        Os restaurantes mais <em>bacanas</em> !
      </Typography>
      <form onSubmit={buscar}>
        <Input
          type="text"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          placeholder="Pesquise aqui o seu restaurante"
          sx={{ minWidth: 300 }}
        />
        <InputLabel id="select-ordenacao"></InputLabel>
        <Select
          value={ordenacao}
          sx={{ minWidth: 300, ml: 5 }}
          labelId="select-ordenacao"
          onChange={(evento) => setOrdenacao(evento.target.value)}
        >
          <MenuItem value="">Padrão</MenuItem>
          <MenuItem value="id">Por ID</MenuItem>
          <MenuItem value="nome">Por nome</MenuItem>
        </Select>

        <Button
          sx={{ ml: 3 }}
          size="large"
          type="submit"
          variant="contained"
          color="primary"
        >
          Buscar
        </Button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}
        >
          Próxima página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
