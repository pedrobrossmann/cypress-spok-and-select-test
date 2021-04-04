# Api Heroku - Desafio 04 - Agilizei

### Tecnologias Utilizadas:
* Framework para crição dos testes [cypress](https://www.cypress.io/)
* Biblioteca para testes de contrato [Spok](https://github.com/bahmutov/cy-spok)
* Biblioteca para agrupar/executar testes por tipos [Cypress Select](https://www.npmjs.com/package/cypress-select-tests)
#### 1. Clone o projeto

```
git clone https://github.com/Bonfipa/api-heroku-desafio-04
cd api-heroku-desafio-04
```

#### 2. Atualize as dependencias

```
npm install
```
#### 3. Execute o cypress com interface gráfica
```
npm run cy:open 
```
#### 4. Execute o cypress via linha de comando
```
npm run cy:run
```
#### 5. Execute testes de contrato
```
npm run cy:test:contract
```
#### 6. Execute testes funcionais
```
npm run cy:test:functional
```
#### 7. Execute testes de "health aplication"
```
npm run cy:test:healtcheck
```
