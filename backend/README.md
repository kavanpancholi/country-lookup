# Country Lookup with Current Exchange Rates API Setup

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create a database and change env values in .env file

### Migration and Seeders run
After creating database and updating .env file run below commands
```
> make migrate
> make seed
```
Migration will create table users and seed some default data

`npm start` or `make start` to run your project 


## Example APIs
>here attached link of postman collection you can download and check in local
>https://www.getpostman.com/collections/34a72c12def3bb5c8111

### Get Country Details
```
> GET : localhost:8080/api/countries/{keyword}
> Headers: 
{
    "Authorization": "Bearer {Token}",
}
> Response : 
{
    "code": 200,
    "data": {
        "countries": [
            {
                "name": "British Indian Ocean Territory",
                "population": 3000,
                "currencies": [
                    {
                        "code": "USD",
                        "name": "United States dollar",
                        "symbol": "$",
                        "rate": 0.1185341886
                    }
                ]
            },
            {
                "name": "India",
                "population": 1295210000,
                "currencies": [
                    {
                        "code": "INR",
                        "name": "Indian rupee",
                        "symbol": "₹",
                        "rate": 8.7421766851
                    }
                ]
            }
        ]
    },
    "success": true
}
```
### Register New User
```
> POST : localhost:8080/register
> Payload :
{
    "firstName": "Kavan",
    "lastName": "Pancholi",
    "email": "kavan@gmail.com",
    "password": "password"
}
> Response : 
{
    "code": 200,
    "data": {
        "userDetails": {
            "id": 3,
            "first_name": "Kavan",
            "last_name": "Pancholi",
            "email": "kavan@gmail.com",
            "created_at": "2020-12-06T21:00:28.000Z",
            "updated_at": "2020-12-06T21:00:28.000Z"
        }
    },
    "success": true
}
```
### Login
```
> POST : localhost:8080/login
> Payload :
{
    "email": "kavanpancholi@gmail.com",
    "password": "password"
}
> Response : 
{
    "code": 200,
    "data": {
        "user": {
            "id": 1,
            "first_name": "Kavan",
            "last_name": "Pancholi",
            "email": "kavanpancholi@gmail.com",
            "created_at": "2020-12-06T08:45:46.000Z",
            "updated_at": "2020-12-06T08:45:46.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImVtYWlsIjoia2F2YW5wYW5jaG9saUBnbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0wNlQwODo0NjoxMC4yNzdaIn0sImlhdCI6MTYwNzI0NDM3MH0.Co6v0Xp1H9IxyUu-znQ4esy_Hxva_gvS7ZLQcjK-T2U"
    },
    "success": true
}
```
### Success Response
```
{
    "success": true,
    "code": 200,
    "data": "object or array"
}
```
### Validation Error Response
```
{
    "success": false,
    "code": 400,
    "errorMessage": "Field is required",
    "error": {},
    "data": null
}
```
