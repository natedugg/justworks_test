# README

The restaurant reservation system!

PostgreSQL is the default database for this application. To use a different database, make changes to `config/database.yml`.

Run `bundle install`.

Run `npm install`.

Run `rake db:setup db:seed` to setup the database.

Run `rails s -e development` to start the server

Navigate to http://localhost:3000.

# API

**`GET api/restaurants/index`**

sample response:
```
[
  {
    "id": 1,
    "name": "Italian Restaurant",
    "created_at": "2022-09-21T20:30:49.978Z",
    "updated_at": "2022-09-21T20:30:49.978Z"
  },
  {
    "id": 2,
    "name": "Greek Restaurant",
    "created_at": "2022-09-21T20:30:50.027Z",
    "updated_at": "2022-09-21T20:30:50.027Z"
  }
]
```
<br>

**`GET api/reservations/index`**

sample response:
```
[
  {
    "id": 9,
    "party_size": 4,
    "reservation_date": "2022-12-24",
    "reservation_slot": "2000-01-01T07:30:00.000Z",
    "party_name": "nate",
    "contact_phone": "913-342-2354",
    "contact_email": "nate@nate.com",
    "restaurant_id": 2,
    "created_at": "2022-09-22T00:25:09.997Z",
    "updated_at": "2022-09-22T00:25:09.997Z"
  },
  {
    "id": 3,
    "party_size": 2,
    "reservation_date": "2022-11-13",
    "reservation_slot": "2000-01-01T04:00:00.000Z",
    "party_name": "jim",
    "contact_phone": "432-432-4324",
    "contact_email": "jim@jim.com",
    "restaurant_id": 1,
    "created_at": "2022-09-21T20:42:52.382Z",
    "updated_at": "2022-09-21T20:42:52.382Z"
  }
]
```
<br>

**`POST api/reservations/create`**

sample request body:
```
{
  "restaurant_id": 3,
  "party_name": "samantha",
  "party_size": "6",
  "reservation_date": "2023-01-12",
  "reservation_slot": "9:00",
  "contact_phone": "234-234-2343",
  "contact_email": "samantha@samantha.com"
}
```

sample response:
```
{
  "id": 10,
  "party_size": 6,
  "reservation_date": "2023-01-12",
  "reservation_slot": "2000-01-01T09:00:00.000Z",
  "party_name": "samantha",
  "contact_phone": "234-234-2343",
  "contact_email": "samantha@samantha.com",
  "restaurant_id": 3,
  "created_at": "2022-09-22T03:04:55.359Z",
  "updated_at": "2022-09-22T03:04:55.359Z"
}
```
<br>

**`DELETE api/reservations/{id}`** sample response:
```
{
  "notice": "Reservation was successfully removed."
}
```

# Postmortem Notes

Those three hours went by very quickly, the app sorta kinda works..? but I have a lot of regrets.

**What went wrong :(**

* I shouldn't have added the choice of restaurants, which wasn't part of the original specification. It took time that could have been spent adding tests and/or improving the code. And as it is, I didn't even take advantage of the foreign key relationship between the reservations and restaurants table at the controller level. The API response for all reservations should have provided the restaurant name with each reservation, which is straightforward with ActiveRecord. Instead, I did a separate AJAX lookup on the reservations page and merged the restaurant names with reservations there, so the foreign key didn't even really get used.
* I've never created a Rails/React application from scratch before, so I had to figure that out upfront. It didn't help that I use Windows at home, which is better for gaming than it is for writing code.. so I ended up running into some Windows-specific errors that required a lot of frantic Googling.
* I took the approach of cobbling together a fair amount of the code from other sources because I was worried about time, and unfortunately it shows.. so I'm not super proud of that, or of the fact that I ran out of time before I could write any tests.
* I didn't really understand what "reservation slot" meant until afterwards. So now I think it should have been a discrete set of values like `7:30`, `7:45`, `8:00`, etc., but sadly in the moment I interpreted that as being a basic time value instead.
* There was no data validation at any level -- database, controller, or front-end. I would like to have included at least some simple front-end checks before allowing submission of the form, like ensuring that the email is valid and that the reservation date is in the future.


**Nice to haves if I had more time**
* Being able to edit an existing reservation, which would have required filling in the `update` method in `api/reservations_controller.rb`. On the front end, I would have made the reservation form modal a separate React component, then made wrapper components for adding and updating reservations.
* A calendar widget for selecting the reservation date, and a dropdown for selecting the time / slot. This would cut down on input errors, as well.
* Date formatting on the reservation list for the reservation date and time (which should have been a slot anyway).
* The email address and phone numbers as anchor tags (using the `mailto:` and `tel:` prefixes)
* A full unit test suite for both the Rails and React code
* Integration tests to simulate the actual user experience (e.g. Cucumber)
