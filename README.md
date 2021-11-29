# **MyWallet**

It's a project for controll finances.

### **About the project**
You can see it working [here.](https://my-wallet-front-phi.vercel.app/)

<br />
<p align="center">
    <img src="https://i.ibb.co/wQjn74Q/Whats-App-Image-2021-11-29-at-10-26-30.jpg" width="250px">
<p>

MyWallet is a single page application designed to be used by mobile devices such as cell phones and tablets.

<br />

### **Tolling**

- [Node JS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

 <br />

## **Getting Started**

### **Prerequisites**

- You must have node and npm installed.

<br />

### **Installation**

1 -  Clone the backend

```sh
https://github.com/deboracaires/MyWallet_Back.git
```

2 - Run npm i to install all dependencies.

```sh
npm i
```

3 - Create the files .env, .env.dev and .env.test following the .env.example or the following variables

```sh
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=
PORT=
DATABASE_URL=
```

4 - Use the sql script on src/database/dump.sql to create your database structure

```sh
psql -d database -f dump.sql
```

5 - Now, set the environment variables according to data from your database. Don't forget to create the database for testing.

   <br />

### **How to run**

1 -  To run the app in the production mode:

```sh
npm run start
```

2 - To run the app in the development mode:

```sh
npm run dev
```
3. To run all tests:

```sh
npm run test
```

### **Deployment**

- This project is deployed on Heroku. The url is https://mywallet-deboracaires.herokuapp.com/. 
