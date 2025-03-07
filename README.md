
## Teste Dynadok

  

Esta aplicação foi desenvolvida como proposta de teste técnico da Dynadok, tendo seus detalhes no seguinte link: https://gist.github.com/thebylito/63b551efbf4d10e715c4fe0519afe34e

  

### Dependências

  

- Docker

  

- Docker Compose

  

### Para Rodar

  

#### Clonar repositório

  

```

git clone git@github.com:gstaciaki/test-dynadok.git

  

cd test-dynadok

```

  

#### Definir variáveis de ambiente

  

```

cp .env.example .env

```

  

#### Subir os containers

  

```

docker compose up -d

```

  

#### Rodar testes

  

```

docker exec api npm run test

```

  

#### Verificar Logs da API em tempo real

  

```

docker compose logs -f api

```

  

### Endpoints da Aplicação

  

A aplicação expõe os seguintes endpoints para gerenciamento de clientes:

  

 **Host**: http://localhost:3000/api

  

#### 1. **Criar um novo cliente**

  

-  **Método:**  `POST`

-  **URL:**  `/clients`
  

#### 2. **Listar todos os clientes**

  

-  **Método:**  `GET`

-  **URL:**  `/clients`


#### 3. **Buscar um cliente pelo ID**

  

-  **Método:**  `GET`

-  **URL:**  `/clients/:id`

-  **Parâmetros da URL:**

-  `id`: ID do cliente a ser consultado.


#### 4. **Atualizar informações de um cliente**

  

-  **Método:**  `PUT`

-  **URL:**  `/clients/:id`

-  **Parâmetros da URL:**

-  `id`: ID do cliente a ser atualizado.
  

#### 5. **Excluir um cliente**

  

-  **Método:**  `DELETE`

-  **URL:**  `/clients/:id`

-  **Parâmetros da URL:**

-  `id`: ID do cliente a ser excluído.