# eztinerary API

API del proyecto grupal "eztinerary"

## API Reference

### Sign Up

Creates a new user with the given information and saves it to the DB

```http
    POST /signup
```

| Parameter  | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `name`     | `string` | **Required**              |
| `surname`  | `string` | **Required**              |
| `email`    | `string` | **Required**              |
| `country`  | `string` | **Required** (in English) |
| `password` | `string` | **Required**              |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: newUser,
        errors?: errorMessage
    }
    // see src/interfaces/User.interface.ts
```

### Sign In

#### "native" user

Allows the user to sign in to their account using email and password

```http
    POST /signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: JWTTokenString,
        errors?: errorMessage
    }
```

### Activities

Allows the front to request activities (All, by country or by city)

```http
    POST /activities
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `country` | `string` | **Optional** |
| `city`    | `string` | **Optional** |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: activities,
        errors?: errorMessage
    }
```

Activities return a object like this:

```js
    {
        name: string,
        description: string,
        picture: string,
        city: string,
        country: string,
        price_currency: string,
        price_amount: string,
        booking: string
    }
```

#### Google user

Allows the user to sign in to their account using their Google account

```http
    GET /google
```

This endpoint is under development.

### User favorites

Allows the user to see a list (or more) of their favorite activities

```http
    GET /favorites
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `userID`  | `string` | **Required** |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: array of activitiesArray,
        errors?: errorMessage
    }
    // see src/interfaces/Activity.interface.ts
```

---

Allows adding an activity to the list of favorites

```http
    POST /favorites
```

| Parameter        | Type     | Description                                           |
| :--------------- | :------- | :---------------------------------------------------- |
| `userID`         | `string` | **Required**                                          |
| `activityID`     | `string` | **Required**                                          |
| `itineraryIndex` | `number` | If not provided, adds the activity to a new itinerary |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: `${activityID} added to ${userID}`,
        errors?: errorMessage
    }
```

---

Allows deleting an activity from the list of favorites

```http
    DELETE /favorites
```

| Parameter        | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `userID`         | `string` | **Required**                                 |
| `itineraryIndex` | `number` | **Required**                                 |
| `activityID`     | `string` | If not provided, deletes the whole itinerary |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: `${activityID} removed from ${userID}[${itineraryIndex}]` || `${itineraryIndex} removed from ${userID}`,
        errors?: errorMessage
    }
```

### UPDATE USER'S PERSONAL INFO

Allows the client to modify his personal info (Name, surname, country, email)

```http
    POST /update
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `name` | `string` | **Optional** |
| `surname`    | `string` | **Optional** |
| `email`    | `string` | **Optional** |
| `country`    | `string` | **Optional** |

**- Password can't be sent to this route, and at least one parameter should be sent.**

### UPDATE USER'S PASSWORD

Allows the client to modify his personal password.

```http
    POST /update/password
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `password` | `string` | **Required** |