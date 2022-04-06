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

---

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

---

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

---

#### Google user

Allows the user to sign in to their account using their Google account

```http
    GET /google
```

This endpoint is under development.

---

### User favorites

Allows the signedin user to see their favorite activities (by individual itineraries)

```http
    GET /favorites
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| none      | none | none        |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: ItinerariesArray,
        errors?: errorMessage
    }
    // see src/interfaces/User.interface.ts
```

---

Allows adding an activity to the list of favorites

```http
    POST /favorites
```

| Parameter       | Type     | Description                                              |
| :-------------- | :------- | :------------------------------------------------------- |
| `userID`        | `string` | **Required**                                             |
| `activityID`    | `string` | **Required**                                             |
| `itineraryName` | `string` | If not provided, creates a new itinerary (it-Date.now()) |

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

| Parameter       | Type     | Description                                  |
| :-------------- | :------- | :------------------------------------------- |
| `userID`        | `string` | **Required**                                 |
| `itineraryName` | `string` | **Required**                                 |
| `activityID`    | `string` | If not provided, deletes the whole itinerary |

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: `${activityID} removed from ${userID}[${itineraryName}]` || `${itineraryName} removed from ${userID}`,
        errors?: errorMessage
    }
```

### GET USER CURRENT PERSONAL INFO

Allows the client to get his current personal info (Name, surname, country, email)

```http
    get /update
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: user,
        errors?: errorMessage
    }
```

user return a object like this:

```js
    {
        name: string,
        surname: string,
        email: string,
        country: string,
    }
```

---

### UPDATE USER'S PERSONAL INFO

Allows the client to modify his personal info (Name, surname, country, email)

```http
    POST /update
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `name`    | `string` | **Optional** |
| `surname` | `string` | **Optional** |
| `email`   | `string` | **Optional** |
| `country` | `string` | **Optional** |

**- Password can't be sent to this route, and at least one parameter should be sent.**

---

### UPDATE USER'S PASSWORD

Allows the client to modify his personal password.

```http
    POST /update/password
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `password` | `string` | **Required** |

---

### ADMIN

### UPDATE USER'S PERSONAL INFO AND/OR PASSWORD

Allows the admin to modify personal info of users

```http
    PUT admin/update/user
```

| Parameter            | Type      | Description  |
| :------------------- | :-------- | :----------- |
| `name`               | `string`  | **Optional** |
| `surname`            | `string`  | **Optional** |
| `email`              | `string`  | **Optional** |
| `country`            | `string`  | **Optional** |
| `password`           | `string`  | **Optional** |
| `role`               | `number`  | **Optional** |
| `activeSubscription` | `boolean` | **Optional** |

**- At least one parameter should be sent.**

---

### CREATE USER

Allows the admin to create users

```http
    POST admin/create/user
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | **Required** |
| `surname`  | `string` | **Required** |
| `email`    | `string` | **Required** |
| `country`  | `string` | **Required** |
| `password` | `string` | **Required** |
| `role`     | `number` | **Required** |

---

### DELETE USER

Allows the admin to delete a user by id

```http
    DELETE admin/delete/user
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

---

### GET ALL USERS

Allows the admin to get all users

```http
    GET admin/users
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: users,
        errors?: errorMessage
    }
```

---

### UPDATE AN ACTIVITY

Allows the admin to modify an activity by id

```http
    PUT admin/update/activity
```

| Parameter        | Type     | Description  |
| :--------------- | :------- | :----------- |
| `id`             | `string` | **Required** |
| `name`           | `string` | **Optional** |
| `description`    | `string` | **Optional** |
| `picture`        | `string` | **Optional** |
| `city`           | `string` | **Optional** |
| `country`        | `string` | **Optional** |
| `price_currency` | `string` | **Optional** |
| `price_amount`   | `number` | **Optional** |
| `booking`        | `string` | **Optional** |

**- At least one parameter should be sent.**

---

### CREATE ACTIVITY

Allows the admin to create an activity

```http
    POST admin/create/activity
```

| Parameter        | Type     | Description  |
| :--------------- | :------- | :----------- |
| `name`           | `string` | **Required** |
| `description`    | `string` | **Required** |
| `picture`        | `string` | **Required** |
| `city`           | `string` | **Required** |
| `country`        | `string` | **Required** |
| `price_currency` | `string` | **Required** |
| `price_amount`   | `number` | **Required** |
| `booking`        | `string` | **Required** |

---

### DELETE ACTIVITY

Allows the admin to delete a activity by id

```http
    DELETE admin/delete/activity
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

---

### GET ALL ACTIVITIES

Allows the admin to get all activities

```http
    GET admin/activities
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: activities,
        errors?: errorMessage
    }
```

---

### Payment with PayPal

#### Create an order

Allows the front to create an order with PayPal API and create a Payment object in the given user's DB

```http
    POST /payment/create
```

| Parameter     | Type     | Description  |
| :------------ | :------- | :----------- |
| `price`       | `number` | **Required** |
| `tier`        | `number` | **Required** |
| `description` | `string` | **Required** |

```js
// see src/interfaces/Cart.interface.ts
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: PayPal link,
        errors?: errorMessage
    }
```

---

#### Capture an order

Allows the front to update a Payment object in the given user's DB, mark it as paid and retrieve meaningful data about the payment and the user

```http
    POST /payment/capture?token
```

| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `token`   | `string` | **Required**. Given as query param via PayPal redirect |

```js
// see src/services/payment.services.ts - createOrder for the redirect URL
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: Payment info,
        errors?: errorMessage
    }
    // see src/interfaces/Payment.interface.ts - FrontFacingPayment
```

---

### BUSINESS

### UPDATE AN ACTIVITY

Allows the admin to modify an activity by id

```http
    PUT business/activities
```

| Parameter        | Type     | Description  |
| :--------------- | :------- | :----------- |
| `id`             | `string` | **Required** |
| `name`           | `string` | **Optional** |
| `description`    | `string` | **Optional** |
| `picture`        | `string` | **Optional** |
| `city`           | `string` | **Optional** |
| `country`        | `string` | **Optional** |
| `price_currency` | `string` | **Optional** |
| `price_amount`   | `number` | **Optional** |
| `booking`        | `string` | **Optional** |

**- At least one parameter should be sent.**

---

### CREATE ACTIVITY

Allows the admin to create an activity

```http
    POST business/activities
```

| Parameter        | Type     | Description  |
| :--------------- | :------- | :----------- |
| `name`           | `string` | **Required** |
| `description`    | `string` | **Required** |
| `picture`        | `string` | **Required** |
| `city`           | `string` | **Required** |
| `country`        | `string` | **Required** |
| `price_currency` | `string` | **Required** |
| `price_amount`   | `number` | **Required** |
| `booking`        | `string` | **Required** |

---

### DELETE ACTIVITY

Allows the business to delete a activity by id

```http
    DELETE business/activities
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

---

### GET ALL ACTIVITIES

Allows the business to get all of his activities

```http
    GET business/activities
```

#### Returns

Alongside the HTTP response status code, the endpoint sends a JSON object

```js
    {
        status: "success" || "failed" || "error",
        data?: activities,
        errors?: errorMessage
    }
```
