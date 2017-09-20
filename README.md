# Didju

## Installation

1. Install [Node.js](https://nodejs.org/en/).

    ```
    brew install node
    ```

2. Install [MongoDB](https://www.mongodb.com).

    ```
    brew install mongodb
    ```

3. Install [Now](https://zeit.co/now).

    ```
    npm install --global now
    ```

4. Clone repository.

    ```
    git clone https://github.com/didju/didju.git && cd didju
    ```

5. Install dependencies in both `client` and `server` directories.

    ```
    npm install
    ```

6. Create `.env` file in the `client` directory and add the following variables:

    ```
    PUBLIC_URL=/
    ```

7. Create `.env` file in the `server` directory and add the following variables:

    ```
    JWT_SECRET=your-jwt-secret
    MONGODB_URI=your-mongo-uri
    NODE_ENV=production
    ```

    Set value for `JWT_SECRET` to something that'll be kept to yourself or your team.

    Set value for `MONGODB_URI` to your production MongoDB server. You can setup a MongoDB server with [mLab](https://mlab.com).

## Usage

### Development

1. Start database server.

    ```
    brew services start mongodb
    ```

2. Start server in `client` directory.

    ```
    npm start
    ```

3. Start server in `server` directory.

    ```
    npm run start:watch
    ```

### Testing

1. Run tests in `client` or `server` directory.

    ```
    npm test
    ```

### Production

1. Create latest build from `client` directory. All of the build files should be in `server/public`.

    ```
    npm run build
    ```

2. Set environment variables in `server` directory.

    ```
    export `cat .env`
    ```

3. Start server in `server` directory.

    ```
    npm start
    ```

### Deployment

1. Create latest build from `client` directory. All of the build files should be in `server/public`.

    ```
    npm run build
    ```

2. Deploy to Now from `server` directory.

    ```
    npm run deploy
    ```

## Authors

- Brigitte Huneke ([@bhuneke](https://github.com/bhuneke))
- Johnny Luangphasy ([@jluangphasy](https://github.com/jluangphasy))
- Kevin Wong ([@cmd-kvn](https://github.com/cmd-kvn))

## License

[MIT](LICENSE.md)
