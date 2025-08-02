#  Tier-Based Event Showcase

A responsive web application that displays events based on the user's subscription tier — built with **Next.js 14 (App Router)**, **Clerk.dev** for authentication, **Supabase** for backend, and **Tailwind CSS** for styling.

---

##  Live Demo

🌐 [Visit Live Site](https://psypher-task-nine.vercel.app/)

🧑‍💻 [GitHub Repository](https://github.com/AnshSonone/psypher_task)

---

##  Features

-  User authentication with Clerk.dev (login/signup)
-  Role-based event access (Free, Silver, Gold, Platinum)
-  Event listing with dynamic tier filtering
-  Fully responsive, clean UI built with Tailwind CSS
-  Color-coded tier badges
-  Bonus: Simulated tier upgrade + RLS protection support

---

##  Tech Stack

- **Frontend:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Auth:** [Clerk.dev](https://clerk.dev/)
- **Backend / DB:** [Supabase](https://supabase.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

##  Setup Instructions

### 1. Clone the Repo

```
git clone https://github.com/yourusername/tier-events-showcase.git
cd tier-events-showcase
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
#### Create a .env.local file in the root:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
You can find these keys in your Clerk and Supabase dashboards.
```

### 4. Set Up Supabase
#### Create events table with this schema:
```
create type tier_enum as enum ('free', 'silver', 'gold', 'platinum');

create table events (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  event_date timestamp,
  image_url text,
  tier tier_enum
);
```
Seed sample data:
Add 6 events (2 per tier) using Supabase SQL editor or UI.

### 5. Enable RLS (Optional + Bonus)
```
alter table events enable row level security;

create policy "Public read access"
on events
for select
using (true);
```
###  Demo Credentials
#### Use any of the following demo users to test tier filtering:

|Tier|Email|Password|
|---|---|---|
|Free|free@gmail.com|freeTier123|
|Silver|silver@gmail.com|silverTier123|
|Gold|gold@gmail.com|goldTier123|
|Platinum|platinum@gmail.com|platinumTier123|

#### If Clerk metadata doesn’t show tier, manually set it in Clerk dashboard.

###  Folder Structure
```
/src
  /app
    /events        → Tier-filtered event page
    /api/events    → Supabase query API route
  /components      → UI components
  /lib
    supabase.js    → Supabase client + tier utils
    middleware.js  → Clerk + route protection
```
###  Acknowledgements
* Clerk.dev
* Supabase
* Next.js
* Tailwind CSS
