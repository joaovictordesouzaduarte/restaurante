import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import Prato from "../Prato";
import estilos from "./Restaurante.module.scss";
import axios from "axios";
import IPrato from "../../../interfaces/IPrato";
import { IPaginacao } from "../../../interfaces/IPaginacao";

interface RestauranteProps {
  restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  useEffect(() => {
    axios
      .get<IPaginacao<IPrato>>("http://localhost:8000/api/v1/pratos/")
      .then((resposta) => {
        setPratos(resposta.data.results);
      });
  }, []);

  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {restaurante.pratos?.map((item) => (
          <Prato prato={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Restaurante;
