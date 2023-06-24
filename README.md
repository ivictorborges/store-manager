# Welcome to Store Manager project ! :zap:

## About :grey_question:

At this application, we have an API  RESTful based on MSC architecture, where contains a dropshipping sales management system where we can create, view, delete, and update products and sales.

## Technologies used :gear:

<strong><h3>Back-end :</h3></strong>
> Docker, Docker Compose, Node.js, JavaScript, Express, Express async errors, Nodemon, Joi, MySQL2

<strong><h3>Tests :</h3></strong>
> Jest, Mocha, Chai, Sinon, Sinon-chai, Chai-http, Frisby

## Running the application :computer:

1. <strong><h3>Clone the repository</h3></strong>
    ```
    git clone git@github.com:ivictorborges/store-manager.git
    ```

2. <strong><h3>Go to folder from repository that you just been clone</h3></strong>
    ```
    cd store-manager
    ```

3. <strong><h3>Run the conteiners</h3></strong>
    - You must be have Docker and Docker Compose installed
    - Then, run the follow command
        ```
        docker-compose up -d
        ```

4. <strong><h3>Execute the conteiners</h3></strong>
    ```
    docker exec -it store_manager bash
    ```

5. <strong><h3>Install the dependencies</h3></strong>
    ```
    npm install
    ```

6. <strong><h3>Run the application</h3></strong>
    ```
    npm start
    ```
    or
    ```
    npm run debug
    ```
    
## Running the tests :test_tube:

- First of all, run the application with the follow command
    ```
    npm run debug
    ```

- Then, run the tests
    ```
    npm test:mocha
    ```

## Documentation :books:

<strong><h3>Routes - Products</h3></strong>

- <strong>GET</strong> <code>/products</code> : The endpoint must return an array with all products registered.

- <strong>GET</strong> <code>/products/:id</code> : The endpoint must return a product by id.

- <strong>POST</strong> <code>/products</code> : The endpoint should be able to add a new product on his database's table.

    <details>
    <summary>Body request</summary><br />

    ```json
    {
        "name": "Product Test"
    }
    ```
    </details>

- <strong>PUT</strong> <code>/products/:id</code> : The endpoint should be able to update a product by id.

    <details>
    <summary>Body request</summary><br />

    ```json
    {
        "name": "Product to update Test"
    }
    ```
    </details>

- <strong>DELETE</strong> <code>/products/:id</code> : The endpoint should be able to delete a product by id.

<strong><h3>Routes - Sales</h3></strong>

- <strong>GET</strong> <code>/sales</code> : The endpoint must return an array with all sales registered.

- <strong>GET</strong> <code>/sales/:id</code> : The endpoint must return a sale by id.

- <strong>POST</strong> <code>/sales</code> : The endpoint should be able to add a new sale on his database's table.

    <details>
    <summary>Body request</summary><br />

    ```json
    [
        {
            "productId": 1,
            "quantity": 1
        },
        {
            "productId": 2,
            "quantity": 5
        }
    ]
    ```
    </details>

- <strong>PUT</strong> <code>/sales/:id</code> : The endpoint should be able to update a sale by id.

     <details>
     <summary>Body request</summary><br />

    ```json
    [
        {
            "productId": 1,
            "quantity": 10
        },
        {
            "productId": 2,
            "quantity": 50
        }
    ]
    ```
    </details>

- <strong>DELETE</strong> <code>/sales/:id</code> : The endpoint should delete a sale by id.