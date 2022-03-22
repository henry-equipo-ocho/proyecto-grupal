# eztinerary API

API del proyecto grupal "eztinerary"

## API Reference

### Sign Up 
Creates a new user with the given information and saves it to the DB
```http
    POST /signup
```
| Parameter | Type     | Description                |
| :-------- | :------- | :----------------------- |
| `name` | `string` | **Required** |
| `surname` | `string` | **Required** |
| `email` | `string` | **Required** |
| `country` | `string` | **Required** (in English) |
| `password` | `string` | **Required** |

#### Returns
Alongside the HTTP response status code, the endpoint sends a JSON object
```js
    {
        status: "success" || "fail" || "error",
        data: newUser || errorMessage
    }
    // see src/interfaces/User.interface.ts
```

### Sign In
#### "native" user
Allows the user to sign in to their account using email and password
```http
    POST /signin
```
| Parameter | Type     | Description                |
| :-------- | :------- | :-------------|
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Returns
Alongside the HTTP response status code, the endpoint sends a JSON object
```js
    {
        status: "success" || "fail" || "error",
        data: JWTTokenString || errorMessage
    }
```
#### Google user
Allows the user to sign in to their account using their Google account
```http
    GET /google
```
This endpoint is under development.