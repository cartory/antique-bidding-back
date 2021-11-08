# Antique Bidding App
Antique Bidding App - Backend, build with `javascript`. You can see the frontend site [here](https://github.com/cartory/antique_bidding_app.git)

## Entity Relationship Diagram 
![EDR-VPP](https://media.discordapp.net/attachments/810375634042748948/907357095815446528/Screen_Shot_2021-11-08_at_15.53.05.png)
## Getting Started
For running backend you to create a `.env` file for enviroments variables and set your DB
by default is with `mysql`

### Download source code

```bash
git clone https://github.com/cartory/antique-bidding-back.git
```
### Install Dependencies
```bash
npm install
```
### Seed Database
You have to run seed 2 times 
1. `Running bulkCreate for categories and roles`
2. `Running bulkCreate for antiques items `

```bash
npm run seed
```
### Run Project
The project runs by default on port 8000 with `socket` server
```bash
npm start
```
or
```bash
npm run dev
```
![localhost](https://cdn.discordapp.com/attachments/810375634042748948/907362972211503144/Screen_Shot_2021-11-08_at_16.16.20.png)
## Author
* **cartory** - *Pedro Caricari* - [cartory](https://github.com/cartory)