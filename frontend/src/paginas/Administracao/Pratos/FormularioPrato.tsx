import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import { ITag } from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [descricao, setDescricao] = useState("");
  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setFile(evento.target.files[0]);
    } else {
      setFile(null);
    }
  };
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("tag", tag);
    formData.append("descricao", descricao);
    formData.append("restaurante", restaurante);
    if (file) {
      formData.append("imagem", file);
    }
    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => alert("Prato cadastrado com sucesso"))

      .catch((erro) => console.log(erro));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição do prato"
          variant="standard"
          fullWidth
          required
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags?.map((tag) => (
              <MenuItem value={tag.value} key={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurantes">Restaurante</InputLabel>
          <Select
            labelId="select-restaurantes"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes?.map((restaurante) => (
              <MenuItem value={restaurante.id} key={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={selecionarArquivo} />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          onChange={(evento) => ""}
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
