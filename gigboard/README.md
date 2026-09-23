# GigBoard

A community noticeboard for live music. Venues list their upcoming gigs; organisers manage the programme.

## Running the API

```bash
cd backend
npm install
cp .env.example .env          # fill in your values
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Endpoints

| Method | URL                  | Auth             | Notes         |
| ------ | -------------------- | ---------------- | ------------- |
| POST   | `/api/auth/register` | none             |               |
| POST   | `/api/auth/login`    | none             | Returns token |
| GET    | `/api/venues`        | none             |               |
| GET    | `/api/venues/:id`    | none             | Includes gigs |
| POST   | `/api/venues`        | ADMIN            |               |
| PUT    | `/api/venues/:id`    | ADMIN            |               |
| DELETE | `/api/venues/:id`    | ADMIN            |               |
| GET    | `/api/gigs`          | none             |               |
| GET    | `/api/gigs/:id`      | none             |               |
| POST   | `/api/gigs`          | ORGANISER, ADMIN |               |
| PUT    | `/api/gigs/:id`      | ORGANISER, ADMIN |               |
| DELETE | `/api/gigs/:id`      | ORGANISER, ADMIN |               |

## Permission matrix

| Action                           | ATTENDEE | ORGANISER | ADMIN |
| -------------------------------- | :------: | :-------: | :---: |
| Read venues and gigs             |    ✓     |     ✓     |   ✓   |
| Create / update / delete a gig   |          |     ✓     |   ✓   |
| Create / update / delete a venue |          |           |   ✓   |